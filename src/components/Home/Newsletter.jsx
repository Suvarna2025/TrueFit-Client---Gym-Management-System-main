import { Button, Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { RiUser3Fill } from "react-icons/ri";
import { assets } from "../../assets/assets";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Newsletter = () => {
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const data = {
      name,
      email,
      subscriptionDate: new Date(),
    };

    await axiosPublic.post("/subscribers", data).then(() => {
      Swal.fire(
        "Success!",
        "Successfully Subscribed! We'll get back to you soon.",
        "success",
      );
    });
    e.target.name.value = "";
    e.target.email.value = "";
  };

  return (
    <section
      style={{ backgroundImage: `url(${assets.GymImage})` }}
      className="relative bg-cover bg-center py-24 md:py-44 lg:py-64 bg-fixed"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>
      <div className="container mx-auto px-3  relative flex gap-10 justify-between items-center ">
        <div className="w-full md:w-1/2">
          {/* Left Side - Text */}
          <div className=" mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 font-prata">
              Stay Updated with TrueFit
            </h2>
            <p className="text-gray-300">
              Get the latest updates, fitness tips, and exclusive offers
              delivered to your inbox.
            </p>
          </div>

          {/* Right Side - Form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="name"
                      className="text-white"
                      value="Your Name"
                    />
                  </div>
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    icon={RiUser3Fill}
                    className=" dark:text-gray-800"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="w-full">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email4"
                      className="text-white"
                      value="Your email"
                    />
                  </div>
                  <TextInput
                    id="email4"
                    name="email"
                    type="email"
                    className=" dark:text-gray-800"
                    icon={HiMail}
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
              </div>

              <Button color="blue" type="submit">
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>
        <div className="hidden md:flex w-1/2">
          <img src={assets.Gym1} className="rounded-lg opacity-80" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
