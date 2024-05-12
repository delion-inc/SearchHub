import { useGetAllRequestsQuery } from "@/api/endpoints/request.api"; 
import Card from "@/components/Card";

const Home = () => {
   const { data, isLoading } = useGetAllRequestsQuery();

   return (
      <section className="">
         <h1 className="text-2xl">Оголошення</h1>
         {isLoading ? (
            <div className="mt-[90px] max-w-[750px] mx-auto space-y-10">
               <p className="mt-[200px] text-center text-background">Завантаження...</p>
            </div>
         ) : (
            <section className="mt-[90px] max-w-[750px] mx-auto space-y-10 px-5"> 
                  {data?.slice()
                  .reverse().map((request) => (
                     <Card key={request.id} {...request}/>
                  ))} 
            </section>
         )}
      </section>
   );
};

export default Home;
