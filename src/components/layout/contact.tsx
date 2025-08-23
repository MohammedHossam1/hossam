"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Mail } from "lucide-react";
import { MdAlternateEmail } from "react-icons/md";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FaUser } from "react-icons/fa";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(5, "Message must be at least 5 characters"),
});

type FormData = z.infer<typeof schema>;

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        toast("MSG Sent Successfully", {
            icon: <CheckCircle className="text-green-600 " />,
            className: " !gap-5",
            description: "Sunday, December 03, 2023 at 9:00 AM",
            position: "top-center",
        })
    };

    return (
        <div className="bg-card relative z-2 text-text p-2 lg:p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 lg:gap-8 w-full "
            >
                {/* Name */}
                <div className="">
                    <div className="flex ">
                        <label className="flex items-center gap-2 text-sm  p-5 bg-dark-1">
                            <FaUser className="size-3" />
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            className="w-full text-sm bg-dark-3 text-text px-3 py-2 outline-none"
                            placeholder="Name"
                        />
                    </div>

                    {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <div className="flex ">
                        <label className="flex items-center gap-2 text-sm  p-5 bg-dark-1">
                            <MdAlternateEmail className="size-3"/>
                        </label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full text-sm bg-dark-3 text-text px-3 py-2 outline-none"
                            placeholder="Email"
                        />
                    </div>

                    {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Message */}
                <div>
                    <div className="flex ">
                        <label className="flex items-start gap-2 text-sm  p-5 bg-dark-1">
                            <Mail className="size-3" />
                        </label>
                        <textarea
                            {...register("message")}
                            className="w-full text-sm bg-dark-3 text-text px-3 py-2 outline-none h-36 resize-none"
                            placeholder="Message"
                        />
                    </div>

                    {errors.message && (
                        <p className="text-red-400 text-xs mt-1">
                            {errors.message.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-main text-dark-1 px-8 py-4 cursor-pointer  text-xs font-bold tracking-widest   w-fit  hover:opacity-80 transition"
                >
                    SEND MESSAGE
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
