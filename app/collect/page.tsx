import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { recentProjects, featuredProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collect | GMUNK",
  description: "GMUNK tokenized digital art — Manifold, SuperRare, and Nifty Gateway.",
};

// ── Data ─────────────────────────────────────────────────────────────────────

type SaleRow = {
  title: string;
  titleHref?: string;
  auctioneer: string;
  editionSize: string;
  saleDate: string;
  saleValue: string;
  saleValueHref?: string;
  saleValueLabel?: string; // "Sale Price" vs "Sale Volume"
};

const manifoldSales: SaleRow[] = [
  {
    title: "Bali Moon",
    titleHref: "https://opensea.io/assets/ethereum/0x3296d57c1b5124ddd99bcb716ed8d4789aaaf3cb/13",
    auctioneer: "Christie's",
    editionSize: "1 / 1",
    saleDate: "December 12, 2023",
    saleValue: "14.23 ETH",
    saleValueHref: "https://opensea.io/assets/ethereum/0x3296d57c1b5124ddd99bcb716ed8d4789aaaf3cb/13",
    saleValueLabel: "Sale Price",
  },
  {
    title: "Ephemera",
    titleHref: "https://opensea.io/assets/ethereum/0x3296d57c1b5124ddd99bcb716ed8d4789aaaf3cb/12",
    auctioneer: "Christie's",
    editionSize: "1 / 1",
    saleDate: "August 18, 2022",
    saleValue: "$18,900 USD",
    saleValueHref: "https://onlineonly.christies.com/s/trespassing/gmunk-b-1975-31/157316",
    saleValueLabel: "Sale Price",
  },
  {
    title: "Ethero Stratos",
    titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/ocular-meshing-17112",
    auctioneer: "Pellas Gallery",
    editionSize: "10",
    saleDate: "February 17, 2022",
    saleValue: "$67,000 USD",
    saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/ocular-meshing-17112",
    saleValueLabel: "Sale Price",
  },
  {
    title: "SkyMunk Classics",
    titleHref: "https://www.niftygateway.com/collections/skymunk-classics",
    auctioneer: "Nifty Gateway",
    editionSize: "9",
    saleDate: "December 19, 2021",
    saleValue: "$41,000 USD",
    saleValueHref: "https://www.niftygateway.com/collections/skymunk-classics",
    saleValueLabel: "Sale Price",
  },
  {
    title: "Inside the Reactor : Geometra",
    titleHref: "https://opensea.io/assets/ethereum/0x3296d57c1b5124ddd99bcb716ed8d4789aaaf3cb/2",
    auctioneer: "Christie's",
    editionSize: "1 / 1",
    saleDate: "December 07, 2021",
    saleValue: "8.5 WETH",
    saleValueHref: "https://opensea.io/assets/ethereum/0x3296d57c1b5124ddd99bcb716ed8d4789aaaf3cb/2",
    saleValueLabel: "Sale Price",
  },
  {
    title: "Penumbra",
    titleHref: "https://opensea.io/assets/ethereum/0x3296d57c1b5124ddd99bcb716ed8d4789aaaf3cb/1",
    auctioneer: "Sotheby's",
    editionSize: "1 / 1",
    saleDate: "November 11, 2021",
    saleValue: "$28,000 USD",
    saleValueHref: "https://opensea.io/assets/ethereum/0x3296d57c1b5124ddd99bcb716ed8d4789aaaf3cb/1",
    saleValueLabel: "Sale Price",
  },
  {
    title: "Island in the Clouds",
    titleHref: "https://opensea.io/assets/matic/0xabe7ba4dc441bbfc12ea107d62c2a7ae67becac7/12",
    auctioneer: "Christie's",
    editionSize: "1 / 1",
    saleDate: "June 03, 2021",
    saleValue: "$17,500 USD",
    saleValueHref: "https://onlineonly.christies.com/s/proof-sovereignty-curated-nft-sale-lady-pheonix/gmunk-b-1975-12/121274",
    saleValueLabel: "Sale Price",
  },
];

const superRareSales: SaleRow[] = [
  { title: "First Breath", titleHref: "https://superrare.com/0xd917d16c10c4ca7424e7e740f4d6cb005eea7958/0xd917d16c10c4ca7424e7e740f4d6cb005eea7958-1", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "February 24, 2023", saleValue: "13 ETH", saleValueHref: "https://superrare.com/0xd917d16c10c4ca7424e7e740f4d6cb005eea7958/0xd917d16c10c4ca7424e7e740f4d6cb005eea7958-1", saleValueLabel: "Sale Price" },
  { title: "Heat Signature", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/heat-signature-34663", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "June 01, 2022", saleValue: "11 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/heat-signature-34663", saleValueLabel: "Sale Price" },
  { title: "Ultraviolet Wave", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-spectrum-of-solace-27575", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "October 30, 2021", saleValue: "9.6 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-spectrum-of-solace-27575", saleValueLabel: "Sale Price" },
  { title: "The Spectrum of Solace", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-spectrum-of-solace-27575", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "September 01, 2021", saleValue: "7.5 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-spectrum-of-solace-27575", saleValueLabel: "Sale Price" },
  { title: "The Perfect Simulation", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-perfect-simulation-22536", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "March 30, 2021", saleValue: "20 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-perfect-simulation-22536", saleValueLabel: "Sale Price" },
  { title: "Inside the Stellation Pattern", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/inside-the-stellation-pattern-21056", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "March 20, 2021", saleValue: "10 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/inside-the-stellation-pattern-21056", saleValueLabel: "Sale Price" },
  { title: "Tristan and Isolde", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/tristan-and-isolde-20393", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "March 14, 2021", saleValue: "10.888 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/tristan-and-isolde-20393", saleValueLabel: "Sale Price" },
  { title: "Spheriform Harmonics", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/spheriform-harmonics-19642", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "February 19, 2021", saleValue: "8.25 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/spheriform-harmonics-19642", saleValueLabel: "Sale Price" },
  { title: "A Date with a Hologram", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/a-date-with-a-hologram-19330", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "February 18, 2021", saleValue: "12 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/a-date-with-a-hologram-19330", saleValueLabel: "Sale Price" },
  { title: "The Emergent Form", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-emergent-form-18723", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "March 24, 2021", saleValue: "11.65 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-emergent-form-18723", saleValueLabel: "Sale Price" },
  { title: "The Psychotropic Colony", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-psychotropic-colony-17515", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "February 17, 2021", saleValue: "6 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-psychotropic-colony-17515", saleValueLabel: "Sale Price" },
  { title: "Ocular Meshing", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/ocular-meshing-17112", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "January 27, 2021", saleValue: "5.1 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/ocular-meshing-17112", saleValueLabel: "Sale Price" },
  { title: "The Divine Molecule", titleHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-divine-molecule-16772", auctioneer: "SuperRare", editionSize: "1 / 1", saleDate: "December 16, 2020", saleValue: "10 ETH", saleValueHref: "https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-divine-molecule-16772", saleValueLabel: "Sale Price" },
];

const niftyGatewaySales: SaleRow[] = [
  { title: "SkyMunk Series", titleHref: "https://www.niftygateway.com/collections/skymunk-series", auctioneer: "Nifty Gateway", editionSize: "58", saleDate: "December 19, 2021", saleValue: "$92,000 USD", saleValueHref: "https://www.niftygateway.com/collections/skymunk-series", saleValueLabel: "Sale Volume" },
  { title: "InfraMunk vol1", titleHref: "https://www.niftygateway.com/collections/inframunk1", auctioneer: "Nifty Gateway", editionSize: "16", saleDate: "April 07, 2021", saleValue: "$183,000 USD", saleValueHref: "https://www.niftygateway.com/collections/inframunk1", saleValueLabel: "Sale Volume" },
  { title: "InfraMunk vol1 Silent", titleHref: "https://www.niftygateway.com/collections/inframunk1silent", auctioneer: "Nifty Gateway", editionSize: "15", saleDate: "April 07, 2021", saleValue: "$87,000 USD", saleValueHref: "https://www.niftygateway.com/collections/inframunk1silent", saleValueLabel: "Sale Volume" },
  { title: "InfraMunk vol1 Tempus", titleHref: "https://www.niftygateway.com/collections/inframunk1tempus", auctioneer: "Nifty Gateway", editionSize: "124", saleDate: "April 07, 2021", saleValue: "$300,000 USD", saleValueHref: "https://www.niftygateway.com/collections/inframunk1tempus", saleValueLabel: "Sale Volume" },
  { title: "Ethero Chronos", titleHref: "https://www.niftygateway.com/marketplace/collection/0x0151834a6997f89eb8372ac54ac077d79bb4d1e0/3", auctioneer: "Nifty Gateway", editionSize: "1 / 1", saleDate: "March 20, 2021", saleValue: "$58,888 USD", saleValueHref: "https://www.niftygateway.com/marketplace/collection/0x0151834a6997f89eb8372ac54ac077d79bb4d1e0/3", saleValueLabel: "Sale Volume" },
  { title: "The Siberiome", titleHref: "https://www.niftygateway.com/marketplace/collection/0x9fe5bdf8194a6aebb1b68b47cb44f382725f38bc/4", auctioneer: "Nifty Gateway", editionSize: "1 / 1", saleDate: "March 20, 2021", saleValue: "$15,050 USD", saleValueHref: "https://www.niftygateway.com/itemdetail/primary/0x9fe5bdf8194a6aebb1b68b47cb44f382725f38bc/4", saleValueLabel: "Sale Volume" },
  { title: "Floating Alone", titleHref: "https://www.niftygateway.com/collections/munktwo", auctioneer: "Nifty Gateway", editionSize: "26", saleDate: "February 19, 2021", saleValue: "$195,000 USD", saleValueHref: "https://www.niftygateway.com/collections/munktwo", saleValueLabel: "Sale Volume" },
  { title: "Floating Alone Open", titleHref: "https://www.niftygateway.com/collections/munktwoopen", auctioneer: "Nifty Gateway", editionSize: "262", saleDate: "February 19, 2021", saleValue: "$379,000 USD", saleValueHref: "https://www.niftygateway.com/collections/munktwoopen", saleValueLabel: "Sale Volume" },
  { title: "Symbiocene Mythologica", titleHref: "https://www.niftygateway.com/collections/gmunkmyth/", auctioneer: "Nifty Gateway", editionSize: "119", saleDate: "January 08, 2021", saleValue: "$263,000 USD", saleValueHref: "https://www.niftygateway.com/collections/gmunkMyth", saleValueLabel: "Sale Volume" },
];

type ExhibitionRow = {
  venue: string;
  venueHref: string;
  event: string;
  year: string;
};

const exhibitionLinks: ExhibitionRow[] = [
  { venue: "Christie's", venueHref: "https://nft.christies.com/auctions/next-wave-the-miami-edit-2023", event: "The Next Wave: The Miami Edit Auction", year: "2023" },
  { venue: "W1 Curates", venueHref: "https://www.atrbute.com/collections/GMUNK-ATRBUTE-Presents-%27Motus-In-Lucem%27-by-GMUNK-at-W1-Curates", event: "Motus in Lucem Solo Exhibition", year: "2023" },
  { venue: "Christie's", venueHref: "https://onlineonly.christies.com/s/trespassing/lots/3207", event: "Trespassing III", year: "2022" },
  { venue: "Pellas Gallery", venueHref: "https://www.pellasgallery.com/exhibitions/19-new-horizons-boston-s-first-nft-digital-art-show/", event: "New Horizons", year: "2022" },
  { venue: "DART", venueHref: "https://superrare.com/curation/editorial/13858", event: "Museo Della Permanente", year: "2022" },
  { venue: "Nifty Gateway", venueHref: "https://www.niftygateway.com/collections/skymunk-classics", event: "SkyMunk vol1", year: "2021" },
  { venue: "Christie's", venueHref: "https://nftnow.com/the-gateway/nft-now-christies-present-the-gateway/", event: "The Gateway Miami Art Basel", year: "2021" },
  { venue: "Sothebys", venueHref: "https://metaverse.sothebys.com/sales", event: "Natively Digital 1.2 Collector's Series", year: "2021" },
  { venue: "Christie's", venueHref: "https://onlineonly.christies.com/s/proof-sovereignty-curated-nft-sale-lady-pheonix/lots/2058", event: "Proof of Sovereignty", year: "2021" },
  { venue: "Nifty Gateway", venueHref: "https://www.niftygateway.com/collections/inframunk1", event: "InfraMunk vol1", year: "2021" },
  { venue: "Carbon Drop", venueHref: "https://www.niftygateway.com/collections/carbondrop", event: "The Carbon Drop", year: "2021" },
  { venue: "ABV Gallery", venueHref: "https://www.niftygateway.com/collections/abvatl", event: "Chain Reaction at ABV Gallery, Atlanta", year: "2021" },
  { venue: "Nifty Gateway", venueHref: "https://www.niftygateway.com/collections/munktwo", event: "Floating Alone", year: "2021" },
  { venue: "Nifty Gateway", venueHref: "https://gmunk.com/Symbiocene-Mythologica", event: "Symbiocene Mythologica", year: "2021" },
];

const resourceLinks = [
  { venue: "CryptoArt.io", venueHref: "https://cryptoart.io/artist/gmunk", description: "Ledger of all SuperRare and Nifty Gateway Sales" },
  { venue: "SuperRare", venueHref: "https://superrare.com/gmunk", description: "Profile Page on SuperRare" },
  { venue: "Nifty Gateway", venueHref: "https://www.niftygateway.com/marketplace/artist/gmunk", description: "Profile Page on Nifty Gateway" },
  { venue: "Manifold", venueHref: "https://opensea.io/GMUNK-studio/created", description: "Profile Page on Opensea for Manifold Custom Contract" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionSeparator({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs text-white/40 tracking-wide">{label}</p>
      <div className="h-px bg-white/20 w-full" />
    </div>
  );
}

function SalesTable({ rows }: { rows: SaleRow[] }) {
  const priceLabel = rows[0]?.saleValueLabel ?? "Sale Price";
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-white/20">
          <th className="pb-3 text-left font-bold text-white w-[28%]">Title</th>
          <th className="pb-3 text-left font-bold text-white w-[20%]">Auctioneer</th>
          <th className="pb-3 text-left font-bold text-white w-[16%]">Edition Size</th>
          <th className="pb-3 text-left font-bold text-white w-[20%]">Sale Date</th>
          <th className="pb-3 text-left font-bold text-white w-[16%]">{priceLabel}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.title} className="border-b border-white/10">
            <td className="py-3.5 font-bold text-white">
              {row.titleHref ? (
                <a href={row.titleHref} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {row.title}
                </a>
              ) : (
                row.title
              )}
            </td>
            <td className="py-3.5 text-white/70">{row.auctioneer}</td>
            <td className="py-3.5 text-white/70">{row.editionSize}</td>
            <td className="py-3.5 text-white/70">{row.saleDate}</td>
            <td className="py-3.5 font-bold text-white">
              {row.saleValueHref ? (
                <a href={row.saleValueHref} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {row.saleValue}
                </a>
              ) : (
                row.saleValue
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const allProjects = [...recentProjects, ...featuredProjects];

export default function CollectPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0d0d0d] pt-24 pb-0 text-white">
        <div className="mx-auto max-w-[1100px] px-6">

          {/* ══ Manifold ══════════════════════════════════════════════════════ */}
          <section className="mb-24">
            {/* Section header */}
            <div className="grid grid-cols-2 gap-16 mb-16">
              <SectionSeparator label="Tokenized Digital Art" />
              <SectionSeparator label="Tokenized Digital Art" />
            </div>

            {/* Platform intro */}
            <div className="grid grid-cols-2 gap-16 mb-16">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">
                  <a href="https://opensea.io/GMUNK-studio/created" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Manifold
                  </a>
                </h1>
                <p className="text-sm leading-relaxed text-white/70">
                  {"Munky's"} custom smart contract starts and ends with{" "}
                  <a href="https://www.manifold.xyz/" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">Manifold</a>
                  {", the premiere platform to empower artists in the web3 space. He has used this contract for multiple sales on "}
                  <a href="https://christies.shorthandstories.com/whats-on/" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">{"Christie's"}</a>
                  {" and "}
                  <a href="https://www.sothebys.com/en/" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">{"Sotheby's"}</a>
                  {" and is certainly the most valued token that gmunk exhibits."}
                </p>
                <p className="text-sm leading-relaxed text-white/50">
                  Manifold empowers digital creators with tools and applications enabling true
                  creative sovereignty and the ability to create innovative NFT experiences for
                  their audiences. With Manifold Studio, artists can mint NFTs with zero code,
                  establish the highest level of provenance and ownership of their work, and give
                  their collectors unique and valuable utility.
                </p>
              </div>
              {/* Platform logo placeholder */}
              <div className="flex items-start">
                <div className="w-[290px] h-[290px] bg-white flex items-center justify-center">
                  <span className="text-black text-5xl font-black tracking-tighter">M</span>
                </div>
              </div>
            </div>

            {/* Sales table */}
            <SalesTable rows={manifoldSales} />
          </section>

          {/* ══ SuperRare ═════════════════════════════════════════════════════ */}
          <section className="mb-24">
            <div className="grid grid-cols-2 gap-16 mb-16">
              <SectionSeparator label="Tokenized Digital Art" />
              <SectionSeparator label="Tokenized Digital Art" />
            </div>

            <div className="grid grid-cols-2 gap-16 mb-16">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">
                  <a href="https://superrare.co/gmunk/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    SuperRare
                  </a>
                </h1>
                <p className="text-sm leading-relaxed text-white/70">
                  The journey into Digital Art collection started in December, 2020 on SuperRare
                  with {"Munky's"} debut genesis,{" "}
                  <a href="https://superrare.com/0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0/the-divine-molecule-16772" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">The Divine Molecule</a>
                  . He went on to do thirteen sales on the platform and is definitely a favorite
                  place to sell his single edition works.
                </p>
                <p className="text-sm leading-relaxed text-white/50">
                  SuperRare is a marketplace to collect and trade unique, single-edition digital
                  artworks. Each artwork is authentically created by an artist in the network, and
                  tokenized as a crypto-collectible digital item that you can own and trade. You
                  can think of SuperRare like Instagram meets {"Christie's"}. A new way to
                  interact with art, culture, and collecting on the internet.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-[290px] h-[290px] bg-black border border-white/20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <span className="text-black text-2xl font-black">SR</span>
                  </div>
                </div>
              </div>
            </div>

            <SalesTable rows={superRareSales} />
          </section>

          {/* ══ Nifty Gateway ═════════════════════════════════════════════════ */}
          <section className="mb-24">
            <div className="grid grid-cols-2 gap-16 mb-16">
              <SectionSeparator label="Tokenized Digital Art" />
              <SectionSeparator label="Tokenized Digital Art" />
            </div>

            <div className="grid grid-cols-2 gap-16 mb-16">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">
                  <a href="https://www.niftygateway.com/marketplace/artist/gmunk" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Nifty Gateway
                  </a>
                </h1>
                <p className="text-sm leading-relaxed text-white/70">
                  All throughout 2021, Munky did massive drops on the Nifty Gateway platform,
                  including his genesis collection{" "}
                  <a href="https://www.niftygateway.com/collections/gmunkmyth/" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">Symbiocene Mythologica</a>
                  {" "}and full-spectrum opus{" "}
                  <a href="https://www.niftygateway.com/collections/inframunk1" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">InfraMunk vol1</a>
                  . Nifty is a legendary platform with a robust and active secondary marketplace,
                  and most of the early Digital Artists cite Nifty Gateway for being a central
                  reason for the widespread adoption of Digital Art.
                </p>
                <p className="text-sm leading-relaxed text-white/50">
                  Nifty Gateway teams up with top artists and brands to create collections of
                  limited edition, high quality Nifties, exclusively available on our platform.
                  Using the blockchain to enforce scarcity and prove authenticity, Nifty Gateway
                  is the premier marketplace to buy, sell, and store your digital art and
                  collectibles in the form of nifties, or non-fungible tokens (NFTs).
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-[290px] h-[290px] bg-[#111] border border-white/20 flex items-center justify-center">
                  <span className="text-white text-5xl font-black tracking-tighter">NG</span>
                </div>
              </div>
            </div>

            <SalesTable rows={niftyGatewaySales} />
          </section>

          {/* ══ Exhibition Links ══════════════════════════════════════════════ */}
          <section className="mb-24">
            <div className="grid grid-cols-2 gap-16 mb-10">
              <SectionSeparator label="Select Exhibition Links" />
              <SectionSeparator label="Resource Links" />
            </div>

            <div className="grid grid-cols-2 gap-16">
              {/* Exhibitions */}
              <div className="space-y-3">
                {exhibitionLinks.map((item) => (
                  <div key={`${item.venue}-${item.event}`} className="text-sm">
                    <a
                      href={item.venueHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-white hover:underline"
                    >
                      {item.venue}
                    </a>
                    <span className="text-white/40"> ── </span>
                    <span className="text-white/70">{item.event}</span>
                    <span className="text-white/40"> – {item.year}</span>
                  </div>
                ))}
              </div>

              {/* Resources */}
              <div className="space-y-3">
                {resourceLinks.map((item) => (
                  <div key={item.venue} className="text-sm">
                    <a
                      href={item.venueHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-white hover:underline"
                    >
                      {item.venue}
                    </a>
                    <span className="text-white/40"> ── </span>
                    <span className="text-white/70">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ══ Portfolio Grid ════════════════════════════════════════════════════ */}
        <section className="border-t border-white/10">
          <div className="grid grid-cols-3">
            {allProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group relative block overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden bg-[#111]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4">
                  <p className="text-sm font-bold text-white leading-tight">{project.title}</p>
                  <p className="text-xs text-white/50 mt-0.5">{project.dateLabel} —</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
