import { NextRequest, NextResponse } from "next/server";

type Translation = "kjv" | "web";

const TRANSLATION_DISPLAY: Record<Translation, string> = {
  kjv: "KJV",
  web: "WEB",
};

/** Normalize abbreviated book names to full names for bible-api.com */
function normalizeBookName(book: string): string {
  return book
    .trim()
    .replace(/^Matt$/i, "Matthew")
    .replace(/^Gen$/i, "Genesis")
    .replace(/^Exod$/i, "Exodus")
    .replace(/^Lev$/i, "Leviticus")
    .replace(/^Num\.?$/i, "Numbers")
    .replace(/^Deut\.?$/i, "Deuteronomy")
    .replace(/^Josh$/i, "Joshua")
    .replace(/^Judg$/i, "Judges")
    .replace(/^1 Sam$/i, "1 Samuel")
    .replace(/^2 Sam$/i, "2 Samuel")
    .replace(/^1 Chro\.?$/i, "1 Chronicles")
    .replace(/^2 Chro\.?$/i, "2 Chronicles")
    .replace(/^Neh\.?$/i, "Nehemiah")
    .replace(/^Eccl\.?$/i, "Ecclesiastes")
    .replace(/^S\.O\.S\.?$/i, "Song of Solomon")
    .replace(/^Isa$/i, "Isaiah")
    .replace(/^Jer$/i, "Jeremiah")
    .replace(/^Lam$/i, "Lamentations")
    .replace(/^Ezek$/i, "Ezekiel")
    .replace(/^Dan$/i, "Daniel")
    .replace(/^Hos$/i, "Hosea")
    .replace(/^Oba$/i, "Obadiah")
    .replace(/^Mic$/i, "Micah")
    .replace(/^Nah$/i, "Nahum")
    .replace(/^Hab$/i, "Habakkuk")
    .replace(/^Zeph$/i, "Zephaniah")
    .replace(/^Hag$/i, "Haggai")
    .replace(/^Zech$/i, "Zechariah")
    .replace(/^Mal$/i, "Malachi")
    .replace(/^Rom\.?$/i, "Romans")
    .replace(/^1 Cor\.?$/i, "1 Corinthians")
    .replace(/^2 Cor\.?$/i, "2 Corinthians")
    .replace(/^Gal\.?$/i, "Galatians")
    .replace(/^Eph\.?$/i, "Ephesians")
    .replace(/^Phil$/i, "Philippians")
    .replace(/^Col\.?$/i, "Colossians")
    .replace(/^1 Thess\.?$/i, "1 Thessalonians")
    .replace(/^2 Thess\.?$/i, "2 Thessalonians")
    .replace(/^1 Tim\.?$/i, "1 Timothy")
    .replace(/^2 Tim\.?$/i, "2 Timothy")
    .replace(/^Tit\.?$/i, "Titus")
    .replace(/^Heb\.?$/i, "Hebrews")
    .replace(/^Jas\.?$/i, "James")
    .replace(/^1 Pet\.?$/i, "1 Peter")
    .replace(/^2 Pet\.?$/i, "2 Peter")
    .replace(/^Rev$/i, "Revelation")
    .replace(/^Pro\.?$/i, "Proverbs");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const passage = searchParams.get("passage");
  const translationParam = (searchParams.get("translation")?.toLowerCase() as Translation) || "kjv";

  if (!passage) {
    return NextResponse.json({ error: "Missing passage parameter" }, { status: 400 });
  }

  // Parse passage like "Genesis 1-3" or "Matt 22"
  const match = passage.match(/^([\w\s.]+?)\s*(\d+)/);
  if (!match) {
    return NextResponse.json({ error: "Invalid passage format" }, { status: 400 });
  }

  const bookName = normalizeBookName(match[1]);
  const chapter = match[2];
  const translation: Translation = translationParam === "web" ? "web" : "kjv";

  try {
    const ref = `${bookName} ${chapter}:1-3`;
    const apiUrl = `https://bible-api.com/${encodeURIComponent(ref)}?translation=${translation}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 86400 }, // Cache 24 hours
    });

    if (!response.ok) {
      console.error(`Bible API error: ${response.status} for ${apiUrl}`);
      return NextResponse.json({ error: "No verses found" }, { status: 404 });
    }

    const data = await response.json();

    if (!data.text) {
      return NextResponse.json({ error: "No verses found" }, { status: 404 });
    }

    return NextResponse.json({
      text: data.text.trim().replace(/\n/g, " "),
      reference: data.reference || ref,
      translation: TRANSLATION_DISPLAY[translation],
    });
  } catch (error) {
    console.error("Bible API fetch error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch verse",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
