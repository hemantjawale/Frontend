import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import RTE from "../RTE.jsx";
import Select from "../Select.jsx";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap lg:flex-nowrap gap-8"
    >
      {/* Left Section: Editor */}
      <div className="w-full lg:w-2/3">
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Editor</h3>
            <p className="text-slate-400 text-sm">
              Create your new masterpiece.
            </p>
          </div>

          <Input
            label="Title"
            placeholder="Give your post a catchy title..."
            className="mb-6 bg-slate-900 border-slate-700 text-white focus:text-black focus:border-indigo-500 focus:ring-indigo-500/50"
            {...register("title", { required: true })}
          />

          <Input
            label="Slug (URL)"
            placeholder="my-awesome-post"
            className="mb-6 bg-slate-900 border-slate-700 text-white focus:text-black font-mono text-sm focus:border-indigo-500"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>
      </div>

      {/* Right Section: Publishing Tools */}
      <div className="w-full lg:w-1/3">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl flex flex-col gap-6 sticky top-4">
          <div className="border-b border-slate-700 pb-4">
            <h3 className="text-lg font-bold text-white">Publishing</h3>
          </div>

          {/* Image Upload */}
          <div>
            <Input
              label="Featured Image"
              type="file"
              className="mb-4 bg-slate-900 border-slate-700 text-slate-300 
                            file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                            file:text-sm file:font-bold file:bg-indigo-600 file:text-white 
                            hover:file:bg-indigo-500 cursor-pointer"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-full mt-4 rounded-xl overflow-hidden border border-slate-600 shadow-lg relative group">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
          </div>

          {/* Status Select */}
          <div>
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4 bg-slate-900 border-slate-700 text-white focus:text-black focus:border-indigo-500"
              {...register("status", { required: true })}
            />
          </div>

          {/* Submit Button with Gradient */}
          <Button
            type="submit"
            bgColor={
              post
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            }
            className="w-full py-3 font-bold text-lg shadow-lg transform transition hover:scale-[1.02]"
          >
            {post ? "✨ Update Post" : "🚀 Publish Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
