"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PostCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");

  const textToCopy = `"${post.post_body}" \n by @${post.creator.username}`;

  const handleCopy = () => {
    setCopied(textToCopy);
    navigator.clipboard.writeText(textToCopy);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <>
      <div className="post_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
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
          </div>
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied == textToCopy
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={12}
              height={12}
            />
          </div>
        </div>

        <p className="my-4 font-satoshi text-sm text-gray-700">
          {post.post_body}
        </p>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>
      </div>
    </>
  );
};

export default PostCard;