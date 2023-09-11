import Header from "@/components/Header/Header"
import SearchForm from "@/components/SearchForm/SearchForm"
export default function Home() {
  return (
    <>
    <Header></Header>
    <div className="pt-12"> {/* pt-16 ile Header yüksekliği kadar boşluk bırakılır */}
      <SearchForm></SearchForm>
       
      </div>
    </>
    
  )
}
