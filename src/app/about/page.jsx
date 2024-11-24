import Image from 'next/image'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-8 md:mb-0">
  <video
    width={600}
    height={400}
    className="rounded-lg shadow-lg"
    autoPlay
    loop
    muted
  >
    <source src="/assets/videos/video.mp4" type="video/mp4" />
    Trình duyệt của bạn không hỗ trợ thẻ video.
  </video>
</div>

        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold mb-4">CHARISMA</h1>
          <p className="text-lg leading-relaxed">
            Charisma - biểu tượng của vẻ đẹp tinh tế và đẳng cấp. Mỗi chiếc vòng tay tại Charisma không chỉ là một món trang sức, mà là một tác phẩm nghệ thuật, được chế tác từ những chất liệu cao cấp với sự chăm chút tỉ mỉ đến từng chi tiết. Với thiết kế thanh lịch, sang trọng nhưng không kém phần độc đáo, Charisma mang đến sự tự tin và phong cách cho những ai yêu thích sự khác biệt. Tại Charisma, chúng tôi tạo nên những chiếc vòng tay không chỉ để đeo, mà để khẳng định cá tính và tôn vinh vẻ đẹp nội tại của bạn.
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Vòng tay",
                description: "Bộ sưu tập vòng tay của nhà Charisma, với những thiết kế độc đáo, tinh tế tận tâm trong từng sản phẩm",
                image: "/assets/images/about/rose1.jpg"
              },
              {
                title: "Charm",
                description: "Charm để trang trí cho chiếc vòng tay xinh yêu của bạn thêm phần cá tính và chất riêng của bạn",
                image: "/assets/images/about/charm.jpg"
              },
              {
                title: "Đặc biệt",
                description: "Bộ sưu tập mà bạn đã yêu thích nếu chưa có thì hãy tìm hiểu ngay các mẫu của nhà Charisma",
                image: "/assets/images/about/collection.jpg"
              }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Xem ngay</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  )
}

