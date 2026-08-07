"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { REGIONS, type Region } from "@/lib/regions";

interface RegionState {
  region: Region;
  setRegion: (r: Region) => void;
}

/**
 * Initial state matches what the server rendered - India, the CSS default.
 * The real value is read after hydration from the attribute RegionScript
 * already set, so React never sees a mismatch and the inference logic is
 * not duplicated a third time.
 */
const Ctx = createContext<RegionState>({ region: "in", setRegion: () => {} });

export const useRegion = () => useContext(Ctx);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>("in");

  useEffect(() => {
    const fromDom = document.documentElement.dataset.region;
    if (fromDom && fromDom in REGIONS) setRegionState(fromDom as Region);
  }, []);

  const setRegion = useCallback((r: Region) => {
    setRegionState(r);
    // The attribute drives CSS visibility for every server-rendered price;
    // React state only drives the interactive calculator.
    document.documentElement.dataset.region = r;
    try {
      localStorage.setItem("region", r);
    } catch {
      // Storage blocked - the choice still applies for this page view.
    }
  }, []);

  return <Ctx.Provider value={{ region, setRegion }}>{children}</Ctx.Provider>;
}
