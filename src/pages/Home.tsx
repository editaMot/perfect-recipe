import BlogSection from "../components/BlogSection";
import Hero from "../components/Hero/Hero";
import NewsletterSection from "../components/NewsletterSection";
import Partners from "../components/Partners";
import PopularCategoriesSection from "../components/PopularCategoriesSection";
import RecipeSharingCard from "../components/RecipeSharingCard";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <RecipeSharingCard />
      <BlogSection />
      <NewsletterSection />
      <PopularCategoriesSection />
      <Partners />
    </>
  );
};

export default Home;
