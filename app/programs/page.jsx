import ProgramsHero from "@/components/Program/Hero";
import FeaturedGift from "@/components/Program/FeaturedGift";
import GiftsCollection from "@/components/Program/GiftsCollection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProgramsPage() {
    return (
        <>
            <Navbar />
            <ProgramsHero />
            <FeaturedGift />
            <GiftsCollection />
            <Footer />
        </>
    );
}
