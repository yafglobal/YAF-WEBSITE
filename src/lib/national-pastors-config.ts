export interface NationalPastor {
  name: string;
  title: string;
  image: string;
  imagePosition?: string;
  quote: string;
  bio: string;
}

export interface NationalPastorConfig {
  regionLabel: string;
  regionSublabel: string;
  /** Hex accent color unique to each region */
  accent: string;
  /** Large ghost word rendered behind the section */
  wordmark: string;
  leader: NationalPastor;
  /** Flip image to right side for visual variety */
  flip?: boolean;
}

export const NATIONAL_PASTORS: Record<string, NationalPastorConfig> = {
  africa: {
    regionLabel: "Africa",
    regionSublabel: "Headquarters",
    accent: "#C8860A",
    wordmark: "VISION",
    leader: {
      name: "Pastor Steve Ogah",
      title: "Global Youth Pastor · Africa",
      image: "/images/about/pastor-steve-ogah.png",
      imagePosition: "center top",
      quote: "This generation is not a problem to be managed — it is a force to be released.",
      bio: "Pastor Steve Ogah serves as the Global Youth Pastor of Living Faith Church Worldwide and Chief of Staff to Bishop David Oyedepo. A Covenant University pioneer graduate, he brings dynamic vision and strategic leadership to Youth Alive's global mission — equipping young people to live with purpose, walk in faith, and transform their world.",
    },
  },

  canada: {
    regionLabel: "Canada",
    regionSublabel: "North America",
    accent: "#D52B1E",
    wordmark: "NORTH",
    flip: true,
    leader: {
      name: "Pastor Aanuoluwapo Akinyera",
      title: "National Youth Pastor · Canada",
      image: "/leadership/pastor-aanuoluwapo-akinyera.png",
      imagePosition: "center top",
      quote:
        "We are raising young people who don't just attend church — they carry it wherever they go.",
      bio: "Pastor Aanuoluwapo Akinyera serves as the National Youth Pastor for Youth Alive Fellowship Canada, overseeing the discipleship of teenagers and young adults across the nation. With a heart for raising Christ-centered leaders, he builds communities of faith that are grounded in the Word and bold in impact.",
    },
  },

  usa: {
    regionLabel: "USA",
    regionSublabel: "North America",
    accent: "#4488EE",
    wordmark: "ABLAZE",
    leader: {
      name: "Pastor Adekunle Adewuyi",
      title: "National Youth Pastor · USA",
      image: "/usayaf/pastor-white-outfit-preaching.webp",
      imagePosition: "center 20%",
      quote: "A generation on fire for God doesn't just change churches — it changes nations.",
      bio: "Pastor Adekunle Adewuyi leads Youth Alive Fellowship across the United States, overseeing the spiritual formation of a generation of faith-filled young adults. His ministry focuses on raising kingdom giants who are equipped not just for Sunday, but for every sphere of life.",
    },
  },

  europe: {
    regionLabel: "Europe",
    regionSublabel: "United Kingdom",
    accent: "#4169E1",
    wordmark: "BORDERS",
    flip: true,
    leader: {
      name: "Pastor David Ekwueme",
      title: "National Youth Pastor · Europe",
      image: "/leadership/PSTREUROPE.png",
      imagePosition: "center top",
      quote: "Across every border and every culture, the fire of God burns without restraint.",
      bio: "Pastor David Ekwueme leads Youth Alive Fellowship across Europe, discipling and mobilising young people from every nation for kingdom impact. His ministry bridges cultures and continents — raising a generation of purpose-driven believers who carry the light of God into every corner of the continent.",
    },
  },
};
