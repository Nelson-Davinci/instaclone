import { useState } from "react";
import Modal from "../../../components/Modal";
import { Link } from "react-router";
import { followUser } from "../../../api/auth";
import { toast } from "sonner";
import handleError from "../../../utils/handleError";

export default function CardOptions({ post, user, accessToken, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  // const [isFollowing, setIsFollowing] = useState(
  //   user?.following?.includes(post?.userId?._id || "")
  // ); //checks if post owner id is included in user following array - returns boolean
  // console.log(post);

  const toggleFollowUser = async (followerId) => {
    setFollowLoading(true);
    try {
      const res = await followUser(followerId, accessToken);
      if (res.status === 200) {
        toast.success(res.data.message);
        setUser((prev) => ({
          ...prev,
          ...res.data.user,
        }));
      }
    } catch (error) {
      handleError(error);
    } finally {
      setFollowLoading(false);
    }
  };

  return (
    <>
      <i
        className="ri-more-line text-2xl cursor-pointer"
        role="button"
        title="More options"
        onClick={() => setIsOpen(true)}
      ></i>
      <Modal
        isOpen={isOpen}
        id="cardOptionsModal"
        classname="w-[90%] max-w-[400px] mx-auto p-0"
        onClose={() => setIsOpen(false)}
      >
        <div className="text-center p-3">
          {user?._id !== post?.userId?._id && (
            <>
              <p
                role="button"
                className="font-semibold cursor-pointer"
                onClick={() => toggleFollowUser(post?.userId?._id)}
              >
                {followLoading
                  ? "loading..."
                  : user?.following?.includes(post?.userId?._id || "")
                  ? "Unfollow"
                  : "Follow"}
              </p>
              <div className="divider"></div>
            </>
          )}
          <p className="font-medium" title="View post">
            <Link to={`post/${post?._id}`}>Go to post</Link>
          </p>
          <div className="divider my-2"></div>
          <p
            className="font-medium cursor-pointer"
            role="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </p>
        </div>
      </Modal>
    </>
  );
}
