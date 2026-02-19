export type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface DailyReading {
  day: DayOfWeek;
  passages: string[];
}

export interface WeekReading {
  week: number;
  readings: DailyReading[];
}

export const PLAN_START_DATE = new Date("2026-01-01T00:00:00");

export const bibleReadingPlan: WeekReading[] = [
  // WEEK 1
  {
    week: 1,
    readings: [
      { day: "thursday", passages: ["Genesis 1", "Matthew 1"] },
      { day: "friday", passages: ["Genesis 2-3", "Matthew 2"] },
      { day: "saturday", passages: ["Genesis 4-5", "Matthew 3"] },
    ],
  },
  // WEEK 2
  {
    week: 2,
    readings: [
      { day: "sunday", passages: ["Genesis 6-7", "Matt 4"] },
      { day: "monday", passages: ["Genesis 8-10", "Matt 5"] },
      { day: "tuesday", passages: ["Genesis 11-13", "Matthew 6"] },
      { day: "wednesday", passages: ["Genesis 14-16", "Matthew 7"] },
      { day: "thursday", passages: ["Genesis 17-19", "Matthew 8"] },
      { day: "friday", passages: ["Genesis 20-22", "Matthew 9"] },
      { day: "saturday", passages: ["Genesis 23-25", "Matthew 10"] },
    ],
  },
  // WEEK 3
  {
    week: 3,
    readings: [
      { day: "sunday", passages: ["Genesis 26-27", "Matt 11"] },
      { day: "monday", passages: ["Genesis 29-31", "Matt 12"] },
      { day: "tuesday", passages: ["Genesis 32-34", "Matt 13"] },
      { day: "wednesday", passages: ["Genesis 35-36", "Matt 14"] },
      { day: "thursday", passages: ["Genesis 38-40", "Matt 15"] },
      { day: "friday", passages: ["Genesis 41-43", "Matt 16"] },
      { day: "saturday", passages: ["Genesis 44-46", "Matt 17"] },
    ],
  },
  // WEEK 4
  {
    week: 4,
    readings: [
      { day: "sunday", passages: ["Genesis 47-48", "Matt 18"] },
      { day: "monday", passages: ["Genesis 50", "Matt 19-21"] },
      { day: "tuesday", passages: ["Exodus 1-3", "Matt 22"] },
      { day: "wednesday", passages: ["Exodus 4-6", "Matt 23"] },
      { day: "thursday", passages: ["Exodus 7-9", "Matt 24"] },
      { day: "friday", passages: ["Exodus 10-12", "Matt 25"] },
      { day: "saturday", passages: ["Exodus 13-15", "Matt 26"] },
    ],
  },
  // WEEK 5
  {
    week: 5,
    readings: [
      { day: "sunday", passages: ["Exodus 16-18", "Matt 27"] },
      { day: "monday", passages: ["Exodus 19-21", "Matt 28"] },
      { day: "tuesday", passages: ["Exodus 22-24", "Mark 1"] },
      { day: "wednesday", passages: ["Exodus 25-27", "Mark 2"] },
      { day: "thursday", passages: ["Exodus 28-30", "Mark 3"] },
      { day: "friday", passages: ["Exodus 31-33", "Mark 4"] },
      { day: "saturday", passages: ["Exodus 34-36", "Mark 5"] },
    ],
  },
  // WEEK 6
  {
    week: 6,
    readings: [
      { day: "sunday", passages: ["Exodus 37-39", "Mark 6"] },
      { day: "monday", passages: ["Exodus 40", "Mark 7-9"] },
      { day: "tuesday", passages: ["Leviticus 1-2", "Mark 10"] },
      { day: "wednesday", passages: ["Leviticus 3-4", "Mark 11"] },
      { day: "thursday", passages: ["Leviticus 5-6", "Mark 12"] },
      { day: "friday", passages: ["Leviticus 7-8", "Mark 13"] },
      { day: "saturday", passages: ["Leviticus 9-10", "Mark 14"] },
    ],
  },
  // WEEK 7
  {
    week: 7,
    readings: [
      { day: "sunday", passages: ["Leviticus 11-12", "Mark 15"] },
      { day: "monday", passages: ["Leviticus 13-14", "Mark 16"] },
      { day: "tuesday", passages: ["Leviticus 15-16", "Luke 1"] },
      { day: "wednesday", passages: ["Leviticus 17-18", "Luke 2"] },
      { day: "thursday", passages: ["Leviticus 18-20", "Luke 3"] },
      { day: "friday", passages: ["Leviticus 21-22", "Luke 4"] },
      { day: "saturday", passages: ["Leviticus 23-24", "Luke 5"] },
    ],
  },
  // WEEK 8
  {
    week: 8,
    readings: [
      { day: "sunday", passages: ["Leviticus 25-27", "Luke 6"] },
      { day: "monday", passages: ["Numbers 1-2", "Luke 7"] },
      { day: "tuesday", passages: ["Numbers 3-4", "Luke 8"] },
      { day: "wednesday", passages: ["Numbers 5-6", "Luke 9"] },
      { day: "thursday", passages: ["Numbers 7-8", "Luke 10"] },
      { day: "friday", passages: ["Numbers 9-10", "Luke 11"] },
      { day: "saturday", passages: ["Numbers 11-12", "Luke 12"] },
    ],
  },
  // WEEK 9
  {
    week: 9,
    readings: [
      { day: "sunday", passages: ["Numbers 13-14", "Luke 13"] },
      { day: "monday", passages: ["Numbers 15-16", "Luke 14"] },
      { day: "tuesday", passages: ["Numbers 17-18", "Luke 15"] },
      { day: "wednesday", passages: ["Numbers 19-20", "Luke 16"] },
      { day: "thursday", passages: ["Numbers 21-22", "Luke 17"] },
      { day: "friday", passages: ["Numbers 23-24", "Luke 18"] },
      { day: "saturday", passages: ["Numbers 25-26", "Luke 19"] },
    ],
  },
  // WEEK 10
  {
    week: 10,
    readings: [
      { day: "sunday", passages: ["Num. 27-29", "Luke 20"] },
      { day: "monday", passages: ["Num. 30-32", "Luke 21"] },
      { day: "tuesday", passages: ["Num. 33-35", "Luke 22"] },
      { day: "wednesday", passages: ["Num. 36", "Luke 23-24"] },
      { day: "thursday", passages: ["Deut. 1-3", "John 1"] },
      { day: "friday", passages: ["Deut. 4-6", "John 2"] },
      { day: "saturday", passages: ["Deut. 7-9", "John 3"] },
    ],
  },
  // WEEK 11
  {
    week: 11,
    readings: [
      { day: "sunday", passages: ["Deut. 10-12", "John 4"] },
      { day: "monday", passages: ["Deut. 13-15", "John 5"] },
      { day: "tuesday", passages: ["Deut. 16-18", "John 6"] },
      { day: "wednesday", passages: ["Deut. 18-21", "John 7"] },
      { day: "thursday", passages: ["Deut. 22-24", "John 8"] },
      { day: "friday", passages: ["Deut. 25-27", "John 9"] },
      { day: "saturday", passages: ["Deut. 28-30", "John 10"] },
    ],
  },
  // WEEK 12
  {
    week: 12,
    readings: [
      { day: "sunday", passages: ["Deut. 31-33", "John 11"] },
      { day: "monday", passages: ["Deut. 34-38", "John 12"] },
      { day: "tuesday", passages: ["Joshua 1-3", "John 13"] },
      { day: "wednesday", passages: ["Joshua 4-6", "John 14"] },
      { day: "thursday", passages: ["Joshua 7-9", "John 15"] },
      { day: "friday", passages: ["Joshua 10-12", "John 16"] },
      { day: "saturday", passages: ["Joshua 13-15", "John 17"] },
    ],
  },
  // WEEK 13
  {
    week: 13,
    readings: [
      { day: "sunday", passages: ["Joshua 16-18", "John 18"] },
      { day: "monday", passages: ["Joshua 19-21", "John 19"] },
      { day: "tuesday", passages: ["Joshua 22-24", "John 20"] },
      { day: "wednesday", passages: ["Judges 1-3", "John 21"] },
      { day: "thursday", passages: ["Judges 4-6", "Acts 1"] },
      { day: "friday", passages: ["Judges 7-9", "Acts 2"] },
      { day: "saturday", passages: ["Judges 10-12", "Acts 3"] },
    ],
  },
  // WEEK 14
  {
    week: 14,
    readings: [
      { day: "sunday", passages: ["Judges 13-15", "Acts 4"] },
      { day: "monday", passages: ["Judges 16-18", "Acts 5"] },
      { day: "tuesday", passages: ["Judges 19-21", "Acts 6"] },
      { day: "wednesday", passages: ["Ruth 1-2", "Acts 7-8"] },
      { day: "thursday", passages: ["Ruth 3-4", "Acts 9-10"] },
      { day: "friday", passages: ["1 Samuel 1-3", "Acts 11"] },
      { day: "saturday", passages: ["1 Samuel 4-6", "Acts 12"] },
    ],
  },
  // WEEK 15
  {
    week: 15,
    readings: [
      { day: "sunday", passages: ["1 Samuel 7-9", "Acts 13"] },
      { day: "monday", passages: ["1 Samuel 10-12", "Acts 14"] },
      { day: "tuesday", passages: ["1 Samuel 13-15", "Acts 15"] },
      { day: "wednesday", passages: ["1 Samuel 16-18", "Acts 16"] },
      { day: "thursday", passages: ["1 Samuel 18-21", "Acts 17"] },
      { day: "friday", passages: ["1 Samuel 22-24", "Acts 18"] },
      { day: "saturday", passages: ["1 Samuel 25-27", "Acts 19"] },
    ],
  },
  // WEEK 16
  {
    week: 16,
    readings: [
      { day: "sunday", passages: ["1 Samuel 28-30", "Acts 20"] },
      { day: "monday", passages: ["1 Samuel 31", "Acts 21-23"] },
      { day: "tuesday", passages: ["2 Samuel 1-3", "Acts 24"] },
      { day: "wednesday", passages: ["2 Samuel 4-6", "Acts 25"] },
      { day: "thursday", passages: ["2 Samuel 7-9", "Acts 26"] },
      { day: "friday", passages: ["2 Samuel 10-12", "Acts 27"] },
      { day: "saturday", passages: ["2 Samuel 13-15", "Acts 28"] },
    ],
  },
  // WEEK 17
  {
    week: 17,
    readings: [
      { day: "sunday", passages: ["2 Samuel 16-18", "Romans 1"] },
      { day: "monday", passages: ["2 Samuel 19-21", "Romans 2"] },
      { day: "tuesday", passages: ["2 Samuel 22-24", "Romans 3"] },
      { day: "wednesday", passages: ["1 Kings 1-3", "Romans 4"] },
      { day: "thursday", passages: ["1 Kings 4-6", "Romans 5"] },
      { day: "friday", passages: ["1 Kings 7-9", "Romans 6"] },
      { day: "saturday", passages: ["1 Kings 10-12", "Romans 7"] },
    ],
  },
  // WEEK 18
  {
    week: 18,
    readings: [
      { day: "thursday", passages: ["2 Kings 1", "Romans 15"] },
      { day: "friday", passages: ["2 Kings 2", "Romans 16"] },
      { day: "saturday", passages: ["1 Kings 13-15", "Rom. 8"] },
    ],
  },
  // WEEK 19
  {
    week: 19,
    readings: [
      { day: "sunday", passages: ["2 Kings 3", "1 Cor. 1"] },
      { day: "monday", passages: ["2 Kings 4", "1 Cor. 2"] },
      { day: "tuesday", passages: ["2 Kings 5", "1 Cor. 3"] },
      { day: "wednesday", passages: ["2 Kings 6", "1 Cor. 4"] },
      { day: "thursday", passages: ["2 Kings 7", "1 Cor. 5"] },
      { day: "friday", passages: ["2 Kings 8", "1 Cor. 6"] },
      { day: "saturday", passages: ["2 Kings 9", "1 Cor. 7"] },
    ],
  },
  // WEEK 20
  {
    week: 20,
    readings: [
      { day: "sunday", passages: ["2 Kings 10-11", "1 Cor. 8"] },
      { day: "monday", passages: ["2 Kings 12-13", "1 Cor. 9"] },
      { day: "tuesday", passages: ["2 Kings 14-15", "1 Cor. 10"] },
      { day: "wednesday", passages: ["2 Kings 18-17", "1 Cor. 11"] },
      { day: "thursday", passages: ["2 Kings 18-19", "1 Cor. 12"] },
      { day: "friday", passages: ["2 Kings 20-21", "1 Cor. 13"] },
      { day: "saturday", passages: ["2 Kings 22-23", "1 Cor. 14"] },
    ],
  },
  // WEEK 21
  {
    week: 21,
    readings: [
      { day: "sunday", passages: ["2 Kings 24-25", "1 Cor. 15"] },
      { day: "monday", passages: ["1 Chro. 1-2", "1 Cor. 16"] },
      { day: "tuesday", passages: ["1 Chro. 3-4", "2 Cor. 1"] },
      { day: "wednesday", passages: ["1 Chro. 5-6", "2 Cor. 2"] },
      { day: "thursday", passages: ["1 Chro. 7-8", "2 Cor. 3"] },
      { day: "friday", passages: ["1 Chro. 9-10", "2 Cor. 4"] },
      { day: "saturday", passages: ["1 Chro. 11-12", "1 Cor. 5"] },
    ],
  },
  // WEEK 22
  {
    week: 22,
    readings: [
      { day: "sunday", passages: ["1 Chro. 13-14", "2 Cor. 6"] },
      { day: "monday", passages: ["1 Chro. 15-16", "2 Cor. 7"] },
      { day: "tuesday", passages: ["1 Chro. 17-18", "2 Cor. 8"] },
      { day: "wednesday", passages: ["1 Chro. 19-20", "2 Cor. 9"] },
      { day: "thursday", passages: ["1 Chro. 21-22", "2 Cor. 10"] },
      { day: "friday", passages: ["1 Chro. 23-24", "2 Cor. 11"] },
      { day: "saturday", passages: ["1 Chro. 25-26", "2 Cor. 12"] },
    ],
  },
  // WEEK 23
  {
    week: 23,
    readings: [
      { day: "sunday", passages: ["1 Chro. 27-29", "2 Cor. 13"] },
      { day: "monday", passages: ["2 Chro. 4-6", "Galatians 2"] },
      { day: "tuesday", passages: ["2 Chro. 7-9", "Galatians 3"] },
      { day: "wednesday", passages: ["2 Chro. 10-12", "Galatians 4"] },
      { day: "thursday", passages: ["2 Chro. 13-15", "Gal. 5"] },
      { day: "friday", passages: ["2 Chro. 16-18", "Galatians 6"] },
      { day: "saturday", passages: ["2 Chro. 3-5", "Galatians 1"] },
    ],
  },
  // WEEK 24
  {
    week: 24,
    readings: [
      { day: "sunday", passages: ["2 Chro. 19-21", "Eph. 1"] },
      { day: "monday", passages: ["2 Chro. 22-24", "Eph. 2"] },
      { day: "tuesday", passages: ["2 Chro. 25-27", "Ephesians 3"] },
      { day: "wednesday", passages: ["2 Chro. 28-30", "Ephesians 4"] },
      { day: "thursday", passages: ["2 Chro. 31-33", "Ephesians 5"] },
      { day: "friday", passages: ["2 Chro. 34-36", "Eph. 6"] },
      { day: "saturday", passages: ["Ezra 1-3", "Philippians 1"] },
    ],
  },
  // WEEK 25
  {
    week: 25,
    readings: [
      { day: "sunday", passages: ["Ezra 4-6", "Philippians 2"] },
      { day: "monday", passages: ["Ezra 7-8", "Phil. 3-4"] },
      { day: "tuesday", passages: ["Ezra 9-10", "Colossians 1-2"] },
      { day: "wednesday", passages: ["Nehemiah 1-3", "Colossians 3"] },
      { day: "thursday", passages: ["Nehemiah 4-6", "Col. 4"] },
      { day: "friday", passages: ["Nehemiah 7-9", "1 Thess 1"] },
      { day: "saturday", passages: ["Neh. 10-11", "1 Thess 2-3"] },
    ],
  },
  // WEEK 26
  {
    week: 26,
    readings: [
      { day: "sunday", passages: ["Neh. 12-13", "1 Thess 4-5"] },
      { day: "monday", passages: ["Esther 1-3", "2 Thess. 1"] },
      { day: "tuesday", passages: ["Esther 4-6", "2 Thess. 2"] },
      { day: "wednesday", passages: ["Esther 7-9", "2 Thess. 3"] },
      { day: "thursday", passages: ["Esther 10", "1 Timothy 1-3"] },
      { day: "friday", passages: ["Job 1-3", "1 Tim. 4"] },
      { day: "saturday", passages: ["Job 4-6", "1 Timothy 5"] },
    ],
  },
  // WEEK 27
  {
    week: 27,
    readings: [
      { day: "sunday", passages: ["Job 7-9", "1 Timothy 6"] },
      { day: "monday", passages: ["Job 10-12", "2 Tim. 1"] },
      { day: "tuesday", passages: ["Job 13-15", "2 Tim. 2"] },
      { day: "wednesday", passages: ["Job 16-18", "2 Timothy 3"] },
      { day: "thursday", passages: ["Job 19-21", "2 Timothy 4"] },
      { day: "friday", passages: ["Job 22-24", "Titus 1"] },
      { day: "saturday", passages: ["Job 25-27", "Titus 2"] },
    ],
  },
  // WEEK 28
  {
    week: 28,
    readings: [
      { day: "sunday", passages: ["Job 28-30", "Titus 3"] },
      { day: "monday", passages: ["Job 31-33", "Philemon 1"] },
      { day: "tuesday", passages: ["Job 34-36", "Hebrew 1"] },
      { day: "wednesday", passages: ["Job 37-39", "Hebrew 2"] },
      { day: "thursday", passages: ["Job 40-42", "Hebrew 3"] },
      { day: "friday", passages: ["Eccl. 1-3", "Heb. 4"] },
      { day: "saturday", passages: ["Eccl. 4-6", "Heb 5"] },
    ],
  },
  // WEEK 29
  {
    week: 29,
    readings: [
      { day: "sunday", passages: ["Eccl. 7-9", "Heb. 6"] },
      { day: "monday", passages: ["Eccl. 10-12", "Heb. 7"] },
      { day: "tuesday", passages: ["S.O.S. 1-3", "Heb. 8"] },
      { day: "wednesday", passages: ["S.O.S. 4-6", "Heb. 9"] },
      { day: "thursday", passages: ["S.O.S. 7-8", "Heb. 10-12"] },
      { day: "friday", passages: ["Isaiah 1-3", "Heb. 13"] },
      { day: "saturday", passages: ["Isaiah 4-6", "James 1"] },
    ],
  },
  // WEEK 30
  {
    week: 30,
    readings: [
      { day: "sunday", passages: ["Isaiah 7-9", "James 2"] },
      { day: "monday", passages: ["Isaiah 10-12", "James 3"] },
      { day: "tuesday", passages: ["Isaiah 13-15", "James 4"] },
      { day: "wednesday", passages: ["Isaiah 16-18", "James 5"] },
      { day: "thursday", passages: ["Isaiah 19-21", "1 Peter 1"] },
      { day: "friday", passages: ["Isaiah 22-24", "1 Peter 2"] },
      { day: "saturday", passages: ["Isaiah 25-27", "1 Peter 3"] },
    ],
  },
  // WEEK 31
  {
    week: 31,
    readings: [
      { day: "sunday", passages: ["Isaiah 28-30", "1 Peter 4"] },
      { day: "monday", passages: ["Isaiah 31-33", "1 Peter 5"] },
      { day: "tuesday", passages: ["Isaiah 34-36", "2 Peter 1"] },
      { day: "wednesday", passages: ["Isaiah 37-39", "2 Peter 2"] },
      { day: "thursday", passages: ["Isaiah 40-42", "2 Peter 3"] },
      { day: "friday", passages: ["Isaiah 43-45", "1 John 1"] },
      { day: "saturday", passages: ["Isaiah 46", "1 John 2"] },
    ],
  },
  // WEEK 32
  {
    week: 32,
    readings: [
      { day: "sunday", passages: ["Isaiah 47", "1 John 3"] },
      { day: "monday", passages: ["Isaiah 48", "1 John 4"] },
      { day: "tuesday", passages: ["Isaiah 49", "1 John 5"] },
      { day: "wednesday", passages: ["Isaiah 50", "2 John 1"] },
      { day: "thursday", passages: ["Isaiah 51", "3 John 1"] },
      { day: "friday", passages: ["Isaiah 52", "Jude 1"] },
      { day: "saturday", passages: ["Isaiah 53", "Revelation 1"] },
    ],
  },
  // WEEK 33
  {
    week: 33,
    readings: [
      { day: "sunday", passages: ["Isaiah 54", "Revelation 2"] },
      { day: "monday", passages: ["Isaiah 55", "Revelation 3"] },
      { day: "tuesday", passages: ["Isaiah 56", "Revelation 4"] },
      { day: "wednesday", passages: ["Isaiah 57", "Revelation 5"] },
      { day: "thursday", passages: ["Isaiah 58", "Revelation 6"] },
      { day: "friday", passages: ["Isaiah 59", "Revelation 7"] },
      { day: "saturday", passages: ["Isaiah 60", "Revelation 8"] },
    ],
  },
  // WEEK 34
  {
    week: 34,
    readings: [
      { day: "sunday", passages: ["Isaiah 61", "Revelation 9"] },
      { day: "monday", passages: ["Isaiah 62", "Revelation 10"] },
      { day: "tuesday", passages: ["Isaiah 63", "Revelation 11"] },
      { day: "wednesday", passages: ["Isaiah 64", "Revelation 12"] },
      { day: "thursday", passages: ["Isaiah 65", "Revelation 13"] },
      { day: "friday", passages: ["Isaiah 66", "Revelation 14"] },
      { day: "saturday", passages: ["Jeremiah 1", "Revelation 15"] },
    ],
  },
  // WEEK 35
  {
    week: 35,
    readings: [
      { day: "sunday", passages: ["Jeremiah 2", "Revelation 16"] },
      { day: "monday", passages: ["Jeremiah 3", "Revelation 17"] },
      { day: "tuesday", passages: ["Jeremiah 4", "Revelation 18"] },
      { day: "wednesday", passages: ["Jeremiah 5", "Revelation 19"] },
      { day: "thursday", passages: ["Jeremiah 6", "Revelation 20"] },
      { day: "friday", passages: ["Jeremiah 7", "Revelation 21"] },
      { day: "saturday", passages: ["Jeremiah 8", "Revelation 22"] },
    ],
  },
  // WEEK 36
  {
    week: 36,
    readings: [
      { day: "sunday", passages: ["Jeremiah 9-10"] },
      { day: "monday", passages: ["Jeremiah 11-12"] },
      { day: "tuesday", passages: ["Jeremiah 13-14"] },
      { day: "wednesday", passages: ["Jeremiah 15-16"] },
      { day: "thursday", passages: ["Jeremiah 17-18"] },
      { day: "friday", passages: ["Jeremiah 19-20"] },
      { day: "saturday", passages: ["Jeremiah 21-22"] },
    ],
  },
  // WEEK 37
  {
    week: 37,
    readings: [
      { day: "sunday", passages: ["Jeremiah 23-24"] },
      { day: "monday", passages: ["Jeremiah 25-26"] },
      { day: "tuesday", passages: ["Jeremiah 27-28"] },
      { day: "wednesday", passages: ["Jeremiah 29-30"] },
      { day: "thursday", passages: ["Jeremiah 31-32"] },
      { day: "friday", passages: ["Jeremiah 33-34"] },
      { day: "saturday", passages: ["Jeremiah 35-37"] },
    ],
  },
  // WEEK 38
  {
    week: 38,
    readings: [
      { day: "sunday", passages: ["Jeremiah 38-40"] },
      { day: "monday", passages: ["Jeremiah 41-43"] },
      { day: "tuesday", passages: ["Jeremiah 44-48"] },
      { day: "wednesday", passages: ["Jeremiah 47-49"] },
      { day: "thursday", passages: ["Jeremiah 50-52"] },
      { day: "friday", passages: ["Lamentation 1-3"] },
      { day: "saturday", passages: ["Lamentation 4-5", "Ezekiel 1"] },
    ],
  },
  // WEEK 39
  {
    week: 39,
    readings: [
      { day: "sunday", passages: ["Ezekiel 2-4"] },
      { day: "monday", passages: ["Ezekiel 5-7"] },
      { day: "tuesday", passages: ["Ezekiel 8-10"] },
      { day: "wednesday", passages: ["Ezekiel 11-13"] },
      { day: "thursday", passages: ["Ezekiel 14-16"] },
      { day: "friday", passages: ["Ezekiel 17-19"] },
      { day: "saturday", passages: ["Ezekiel 20-22"] },
    ],
  },
  // WEEK 40
  {
    week: 40,
    readings: [
      { day: "sunday", passages: ["Ezekiel 23-25"] },
      { day: "monday", passages: ["Ezekiel 26-28"] },
      { day: "tuesday", passages: ["Ezekiel 29-31"] },
      { day: "wednesday", passages: ["Ezekiel 32-34"] },
      { day: "thursday", passages: ["Ezekiel 35-37"] },
      { day: "friday", passages: ["Ezekiel 38-40"] },
      { day: "saturday", passages: ["Ezekiel 41-43"] },
    ],
  },
  // WEEK 41
  {
    week: 41,
    readings: [
      { day: "sunday", passages: ["Ezekiel 44-46"] },
      { day: "monday", passages: ["Ezekiel 47-48", "Daniel 1"] },
      { day: "tuesday", passages: ["Daniel 2-4"] },
      { day: "wednesday", passages: ["Daniel 5-7"] },
      { day: "thursday", passages: ["Daniel 8-10"] },
      { day: "friday", passages: ["Daniel 11-12", "Hosea 1"] },
      { day: "saturday", passages: ["Hosea 2-4"] },
    ],
  },
  // WEEK 42
  {
    week: 42,
    readings: [
      { day: "sunday", passages: ["Hosea 5-7"] },
      { day: "monday", passages: ["Hosea 8-10"] },
      { day: "tuesday", passages: ["Hosea 11-13"] },
      { day: "wednesday", passages: ["Hosea 14", "Joel 1-2"] },
      { day: "thursday", passages: ["Joel 3", "Amos 1-2"] },
      { day: "friday", passages: ["Amos 3-5"] },
      { day: "saturday", passages: ["Amos 6-8"] },
    ],
  },
  // WEEK 43
  {
    week: 43,
    readings: [
      { day: "sunday", passages: ["Amos 9", "Oba 1", "Jonah 1"] },
      { day: "monday", passages: ["Jonah 2-4"] },
      { day: "tuesday", passages: ["Micah 1-3"] },
      { day: "wednesday", passages: ["Micah 4-6"] },
      { day: "thursday", passages: ["Micah 7", "Nahum 1-2"] },
      { day: "friday", passages: ["Nahum 3", "Habakkuk 1-2"] },
      { day: "saturday", passages: ["Habakkuk 3", "Zeph 1-2"] },
    ],
  },
  // WEEK 44
  {
    week: 44,
    readings: [
      { day: "sunday", passages: ["Zeph 3", "Haggai 1-2"] },
      { day: "monday", passages: ["Zech 1-3"] },
      { day: "tuesday", passages: ["Zech 4-6"] },
      { day: "wednesday", passages: ["Zech 7-9"] },
      { day: "thursday", passages: ["Zech 10-12"] },
      { day: "friday", passages: ["Zech 13-14", "Malachi 1"] },
      { day: "saturday", passages: ["Malachi 2-4"] },
    ],
  },
  // WEEK 45
  {
    week: 45,
    readings: [
      { day: "sunday", passages: ["Psalms 1-3"] },
      { day: "monday", passages: ["Psalms 4-6"] },
      { day: "tuesday", passages: ["Psalms 7-9"] },
      { day: "wednesday", passages: ["Psalms 10-12"] },
      { day: "thursday", passages: ["Psalms 13-15"] },
      { day: "friday", passages: ["Psalms 16-18"] },
      { day: "saturday", passages: ["Psalms 19-21"] },
    ],
  },
  // WEEK 46
  {
    week: 46,
    readings: [
      { day: "sunday", passages: ["Psalms 22-24"] },
      { day: "monday", passages: ["Psalms 25-27"] },
      { day: "tuesday", passages: ["Psalms 28-30"] },
      { day: "wednesday", passages: ["Psalms 31-33"] },
      { day: "thursday", passages: ["Psalms 34-36"] },
      { day: "friday", passages: ["Psalms 37-39"] },
      { day: "saturday", passages: ["Psalms 40-42"] },
    ],
  },
  // WEEK 47
  {
    week: 47,
    readings: [
      { day: "sunday", passages: ["Psalms 43-45"] },
      { day: "monday", passages: ["Psalms 46-48"] },
      { day: "tuesday", passages: ["Psalms 49-51"] },
      { day: "wednesday", passages: ["Psalms 52-54"] },
      { day: "thursday", passages: ["Psalms 55-57"] },
      { day: "friday", passages: ["Psalms 58-60"] },
      { day: "saturday", passages: ["Psalms 61-63"] },
    ],
  },
  // WEEK 48
  {
    week: 48,
    readings: [
      { day: "sunday", passages: ["Psalms 64-66"] },
      { day: "monday", passages: ["Psalms 67-69"] },
      { day: "tuesday", passages: ["Psalms 70-72"] },
      { day: "wednesday", passages: ["Psalms 73-75"] },
      { day: "thursday", passages: ["Psalms 76-78"] },
      { day: "friday", passages: ["Psalms 79-81"] },
      { day: "saturday", passages: ["Psalms 82-84"] },
    ],
  },
  // WEEK 49
  {
    week: 49,
    readings: [
      { day: "sunday", passages: ["Psalms 85-87"] },
      { day: "monday", passages: ["Psalms 88-90"] },
      { day: "tuesday", passages: ["Psalms 91-93"] },
      { day: "wednesday", passages: ["Psalms 94-96"] },
      { day: "thursday", passages: ["Psalms 97-99"] },
      { day: "friday", passages: ["Psalms 100-103"] },
      { day: "saturday", passages: ["Psalms 104-106"] },
    ],
  },
  // WEEK 50
  {
    week: 50,
    readings: [
      { day: "sunday", passages: ["Psalms 107-109"] },
      { day: "monday", passages: ["Psalms 110-112"] },
      { day: "tuesday", passages: ["Psalms 113-115"] },
      { day: "wednesday", passages: ["Psalms 116-118"] },
      { day: "thursday", passages: ["Psalms 119-121"] },
      { day: "friday", passages: ["Psalms 122-124"] },
      { day: "saturday", passages: ["Psalms 125-127"] },
    ],
  },
  // WEEK 51
  {
    week: 51,
    readings: [
      { day: "sunday", passages: ["Psalms 128-130"] },
      { day: "monday", passages: ["Psalms 131-133"] },
      { day: "tuesday", passages: ["Psalms 134-136"] },
      { day: "wednesday", passages: ["Psalms 137-139"] },
      { day: "thursday", passages: ["Psalms 140-142"] },
      { day: "friday", passages: ["Psalms 143-145"] },
      { day: "saturday", passages: ["Psalms 146-148"] },
    ],
  },
  // WEEK 52
  {
    week: 52,
    readings: [
      { day: "sunday", passages: ["Psalms 149-150", "Pro. 1"] },
      { day: "monday", passages: ["Proverbs 2-4"] },
      { day: "tuesday", passages: ["Proverbs 5-7"] },
      { day: "wednesday", passages: ["Proverbs 8-10"] },
      { day: "thursday", passages: ["Proverbs 11-13"] },
      { day: "friday", passages: ["Proverbs 14-16"] },
      { day: "saturday", passages: ["Proverbs 17-19"] },
    ],
  },
  // WEEK 53
  {
    week: 53,
    readings: [
      { day: "sunday", passages: ["Proverbs 20-22"] },
      { day: "monday", passages: ["Proverbs 23-25"] },
      { day: "tuesday", passages: ["Proverbs 26-28"] },
      { day: "wednesday", passages: ["Proverbs 29-30"] },
      { day: "thursday", passages: ["Proverbs 31"] },
    ],
  },
];
