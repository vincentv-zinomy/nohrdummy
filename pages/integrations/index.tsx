import LandingPageLayout from "@/components/Layout/LandingPageLayout";
import CategoriesButton from "@/components/integrations/CategoriesButton";
import SearchBar from "@/components/integrations/SearchBar";
import axiosWithoutAuth from "@/lib/axiosAPIwithoutAuth";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Head from "next/head";

type Props = {
  data: logoDataI[];
};

export interface logoDataI {
  id: string;
  name: string;
  logo_url: string;
  description: string;
}

const categories = [
  {
    id: 1,
    name: "App Families",
    submenus: [
      {
        id: "sfvsdfv",
        name: "Amazon",
      },
      {
        id: "sfvsdf",
        name: "Facebook",
      },
      {
        id: "svsdf",
        name: "Google",
      },
    ],
  },
];

export async function getServerSideProps() {
  try {
    const getData = await axiosWithoutAuth.get(
      `/integration-auth/public/fetch-all`
    );

    return { props: { data: getData.data } };
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}

const index = ({ data }: Props) => {
  return (
    <LandingPageLayout>
      <Head>
        <title>Integrations</title>
        <meta
          name="description"
          content="Connect with third-party tools that you're already using"
        />
        <meta property="og:title" content="Integrations" />
        <meta
          property="og:description"
          content="Connect with third-party tools that you're already using"
        />
      </Head>
      <section className="  bg-white">
        <div className="max-w-5xl md:px-5 mx-auto flex flex-col-reverse lg:flex-row items-center justify-between py-10 lg:py-14">
          <div className="flex gap-8 justify-between ">
            <div className="shrink-0  ">
              <h3 className="font-semibold text-xl w-fit">All Categories</h3>
              <div className="mt-2 w-fit">
                  {categories.map((x) => {
                    return (
                     <CategoriesButton data={x}/>
                    );
                  })}
              </div>
            </div>
            <div>
              <div className="relative h-fit">
                
                 <SearchBar/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {data.map((x: logoDataI) => (
                  <div
                    className="w-full h-16	 cursor-pointer  p-2 border border-white hover:border-slate-100 hover:shadow-md rounded-md flex items-center gap-3 relative"
                    key={x.id}
                  >
                    <div className="h-12 w-12 p-2 rounded-md border overflow-hidden border-slate-100 shrink-0 flex items-center justify-center">
                      <img
                        src={x.logo_url}
                        alt=""
                        className="h-full rounded-lg"
                      />
                    </div>
                    <div className=" ">
                      <h3 className="text-md font-semibold">{x.name}</h3>
                      <p className="text-md">{x.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default index;
