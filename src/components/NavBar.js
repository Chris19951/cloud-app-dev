function NavBar() {
    function addOverlay(){
        const overlay = document.querySelector(".overlay")
        overlay.classList.add("active")
    }
    return (
      <div className="navbar">
        <div className="navLeft">
            <div className="title">
                ImageBlog
            </div>
        </div>
        <div className="navRight">
            <div className="link">
                Einloggen
            </div>
            <div className="link">
                Anmelden
            </div>
            <div onClick={addOverlay} className="linkUpload">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="uploadIcon w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>

                Hochladen
            </div>
        </div>
      </div>
    );
  }
  
  export default NavBar;


 
 