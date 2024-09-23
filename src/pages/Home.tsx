import BlogSection from "../components/BlogSection";
import Hero from "../components/Hero/Hero";
import NewsletterSection from "../components/NewsletterSection";
import Partners from "../components/Partners";
import RecipeSharingCard from "../components/Recipe/RecipeSharingCard";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <RecipeSharingCard />
      <BlogSection />
      <NewsletterSection />
      <Partners />
    </>
  );
};

export default Home;
