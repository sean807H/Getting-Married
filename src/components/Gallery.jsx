function Gallery(){
    const images = [
        "/images/photo1.jpg",
        "/images/photo2.png",
        "/images/photo3.jpg",
        "/images/photo4.jpeg",
    ]
return(
    <div>
        <h2>우리의 추억</h2>
        <div style={{display:"flex", gap:"10px", flexWrap:"wrap"}}>
            {images.map((src, index)=>(
                <img key={index}
                    src={src}
                    alt={`기념사진${index+1}`}
                    width="150"
                ></img>
            ))}
        </div>
    </div>
)
}
export default Gallery;