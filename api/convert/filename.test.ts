import { getFilenameFromMeta } from "./filename";
import { stub } from "../../utils/testUtils";
import { Info } from "youtube-dl";

describe("filename", () => {
  it("Sanitises accented characters", () => {
    const params = stub<Info & { title: string; ext: string }>({
      title: "Adrian Ström",
      ext: "ogg",
    });

    let sanitised = getFilenameFromMeta(params);

    expect(sanitised).toBe("Adrian Strom.ogg");
  });
});
