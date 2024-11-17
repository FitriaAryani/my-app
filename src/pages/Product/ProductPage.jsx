import { useState, useEffect, useRef, useTransition } from "react";
import getAllProducts from "../../services/getAllProducts";
import Navbar from "../../components/Navbar/Navbar";
import RadioButton from "../../components/RadioButton/RadioButton";
import CardList from "../../CardList/CardList";
import getAllProductCategories from "../../services/getAllProductCategories";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const radioButtonOpts = useRef([
    {
      label: "All",
      value: "all",
    },
  ]);

  const originalProducts = useRef([]);
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function fetchAllProducts() {
      let allProducts = getAllProducts();
      allProducts = allProducts.length > 0 ? allProducts : [];
      // simpan data produk yg belum difilter
      originalProducts.current = allProducts;
      // simpan data produk yg telah difilter
      setProducts(allProducts);
    }

    function fetchCategories() {
      const allCategories = getAllProductCategories();
      const newCategories = allCategories
        .map((cat) => ({ label: cat.name, value: cat.slug }))
        .filter(
          (newCat) =>
            !radioButtonOpts.current.some((existingCat) => existingCat.value === newCat.value)
        );
      radioButtonOpts.current = [...radioButtonOpts.current, ...newCategories];
    }
    // console.log(radioButtonOpts.current)
    fetchCategories();
    fetchAllProducts();
  }, []);

  useEffect(() => {
    startTransition(() => {
      const filtered = originalProducts.current.filter((product) => {
        const matchedCategory =
          selectedCategory === "all" || product.categorySlug === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

        return matchedCategory && matchesSearch;
      });

      return setProducts(filtered);
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // const RadioButtonOpts = [
  //   {
  //     label: "All",
  //     value: "all",
  //   },
  //   {
  //     label: "Cookies",
  //     value: "cookies",
  //   },
  //   {
  //     label: "Brownie",
  //     value: "brownie",
  //   },
  //   {
  //     label: "Cake",
  //     value: "cake",
  //   },
  // ];

  return (
    <>
      <div className='bg-[#F6F5F2] min-h-screen text-white'>
        <Navbar onSearchChange={handleSearchChange}></Navbar>
        <div className='text-center my-4'>
          <h1 className='text-3xl font-bold mt-10 text-[#543310]'>
            Hi Mate!!! - Welcome To The Sweet World
          </h1>
        </div>

        <div className='px-24 py-4 gap-4 mt-4 flex-wrap text-[#543310]'>
          <h3 className='font-medium'>Filter</h3>
          <div className='flex gap-2 flex-wrap'>
            <RadioButton
              options={radioButtonOpts.current}
              defaultValue={"all"}
              onChange={handleCategoryChange}
            />
          </div>
        </div>
        <section className='container px-24 py-4'>
          <main className='grid grid-cols-4 gap-4'>
            <CardList products={products} isPending={isPending} />
          </main>
        </section>
      </div>
    </>
  );
}
