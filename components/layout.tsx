import Header from "@/components/header";
import Footer from "@/components/footer"
function Layout({children}:any){
    return(
        <>
        <Header/>
        <main>{children}</main>
        <Footer/>
        </>
    )
}

export default Layout;