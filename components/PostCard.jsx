"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PostCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const textToCopy = `"${post.post_body}" \n by @${post.creator.username}`;

  const handleCopy = () => {
    setCopied(textToCopy);
    navigator.clipboard.writeText(textToCopy);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleCreatorClick = () => {
    router.push(`/profile/${post.creator._id}`);
  };

  return (
    <>
      <div className="post_card">
        <div className="flex justify-between items-start gap-5">
          {/* Profile Name with Tooltip */}
          <div
            className="group relative flex-1 flex justify-start items-center gap-3 cursor-pointer"
            onClick={handleCreatorClick}
          >
            <Image
              src={post.creator.image}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
            {/* Tooltip for "View Profile" */}
            <div className="bg-gray-200 p-2 rounded-md hidden group-hover:flex absolute -top-2 -translate-y-full left-[40%] -translate-x-[50%]">
              <span className="text-gray-500 whitespace-nowrap">
                View Profile
              </span>
              <div className="bg-inherit rotate-45 p-1 absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>

          {/* Copy Button */}
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied == textToCopy
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={12}
              height={12}
              alt="Copy Icon"
            />
          </div>
        </div>
        {/* Post Body */}
        {/* Note: whitespace-pre-wrap is used to preserve the line breaks of the actual post_body from the DB  */}
        <p className="my-4 font-satoshi text-sm text-gray-700 whitespace-pre-wrap">
          {post.post_body}
        </p>
        {/* Post Tag */}
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>

        {/* Edit/Delete Buttons for Own Post */}
        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostCard;
