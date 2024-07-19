// create-artifact-store.ts
import { ArtifactStore } from "@railgun-community/wallet";
import localforage from "localforage";

export const createArtifactStore = (): ArtifactStore => {
  return new ArtifactStore(
    async (path: string) => {
      return localforage.getItem(path);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   @ts-ignore
    async (_dir: string, path: string, item: string | Buffer) => {
      await localforage.setItem(path, item);
    },
    async (path: string) => (await localforage.getItem(path)) != null
  );
};
