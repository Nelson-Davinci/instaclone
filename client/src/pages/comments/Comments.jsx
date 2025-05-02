import { useLocation, useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { deletePost, getAPost } from "../../api/post";
import { useAuth } from "../../store";
import useFetch from "../../hooks/useFetch";
import MetaArgs from "../../components/MetaArgs";
import LazyloadComponent from "../../components/LazyLoadImage";
import useSlideControl from "../../hooks/useSlideControl";
import TimeAgo from "timeago-react";
import { deleteComment } from "../../api/comment";
import { toast } from "sonner";

export default function Comments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname === `/post/${id}`;
  const { accessToken, user } = useAuth();
  const { data, setData } = useFetch({
    apiCall: getAPost,
    params: [id, accessToken],
  });
  const { comments, post } = data ?? {};
  const { currentImageIndex, handlePrevious, handleNext } = useSlideControl(
    post?.media
  );
  console.log(data);

  useEffect(() => {
    if (path) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      navigate("/");
    }
  }, [navigate, path]);

  const handleClose = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handlePostDelete = async () => {
    try {
      const res = await deletePost(id, accessToken);
      if (res.status === 200) {
        toast.success(res.data.message);
        setPosts((prev) => {
          return {
            ...prev,
            posts: prev.posts.filter((post) => post._id !== id),
          };
        });
        setIsModalOpen(false);
        navigate("/");
      }
    } catch (error) {
      handleError(error);
    }
  };



  const formatTime = (time) => {
    return <TimeAgo datetime={time} locale="en-US" />;
  };

  return (
    <>
      <MetaArgs
        title={`${post?.userId?.username} - ${post?.caption}`}
        content="View post details"
      />
      <Modal
        isOpen={isModalOpen}
        id="postModalComment"
        classname="w-[90%] max-w-[1024px] mx-auto p-0"
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-30"
          type="button"
          onClick={handleClose}
        >
          <i className="ri-close-line"></i>
        </button>
        <div className="grid grid-cols-12 h-[700px] ">
          <div className="col-span-12 lg:col-span-6">
            <figure className="relative overflow-hidden">
              {post?.media.map((item, index) => (
                <div
                  key={index}
                  className={`transition-transform duration-500 ease-in-out transform ${
                    index === currentImageIndex
                      ? "fade-enter fade-enter-active"
                      : "fade-exit fade-exit-active"
                  }`}
                >
                  {index === currentImageIndex && (
                    <>
                      {item.endsWith(".mp4") || item.endsWith(".webm") ? (
                        <>
                          <video
                            src={item}
                            controls={false}
                            loop
                            playsInline
                            autoPlay
                            className="w-full h-auto lg:h-[550px] object-cover aspect-square md:rounded-md"
                          ></video>
                        </>
                      ) : (
                        <LazyloadComponent
                          image={item}
                          classname="w-full h-[400px] lg:h-[700px] object-cover aspect-square shrink-0"
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
              <>
                {currentImageIndex < post?.media?.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 btn btn-circle btn-sm opacity-75 hover:opacity-100"
                  >
                    <i className="ri-arrow-right-s-line text-lg"></i>
                  </button>
                )}
              </>
              <>
                {currentImageIndex > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="absolute left-2 top-1/2 btn btn-circle btn-sm opacity-75 hover:opacity-100"
                  >
                    <i className="ri-arrow-left-s-line text-lg"></i>
                  </button>
                )}
              </>
              {post?.media?.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform-translate-x-1/2 flex gap-3">
                  {post?.media?.map((_, index) => (
                    <div
                      key={index}
                      className={`w-[8px] h-[8px] rounded-full ${
                        index === currentImageIndex
                          ? "bg-fuchsia-900"
                          : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              )}
            </figure>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:relative h-auto overflow-auto">
            <div className="p-4 w-full mb-1 flex items-center justify-between border-b border-gray-300">
              <Link
                className="flex gap-2 items-center"
                to={`/profile/${post?.userId?.username}`}
              >
                <div className="avatar avatar-placeholder">
                  <div className="w-10 rounded-full border border-gray-300">
                    {post?.userId?.profilePicture ? (
                      <img
                        src={post?.userId?.profilePicture}
                        alt={post?.userId?.username}
                      />
                    ) : (
                      <span className="text-3xl">
                        {post?.userId?.username?.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
                <p className="font-bold">{post?.userId?.username}</p>
              </Link>
              {/* {user?._id === post?.userId?._id && (
              )} */}
              <i
                className="ri-more-line text-2xl cursor-pointer lg:mr-10"
                role="button"
                title="see options"
                onClick={() => setOptionsModal(true)}
              ></i>
              <Modal
                isOpen={optionsModal}
                id="options_Modal"
                classname="w-[90%] max-w-[400px] mx-auto p-0"
                onClose={() => setOptionsModal(false)}
              >
                <div className="text-center p-3">
                  <p
                    className="font-semibold cursor-pointer text-red-600"
                    role="button"
                    onClick={handlePostDelete}
                  >
                    Delete Post
                  </p>
                  <div className="divider my-2 "></div>
                  <Link to={`/post/edit/${id}`} className="font-semibold">
                    Edit
                  </Link>
                  <div className="divider my-2"></div>
                  <p
                    className="font-medium cursor-pointer"
                    role="button"
                    onClick={() => setOptionsModal(false)}
                  >
                    Cancel
                  </p>
                </div>
              </Modal>
            </div>
            <div className="p-4 h-[500px] overflow-auto">
              <div className="flex gap-3">
                <div className="avatar avatar-placeholder">
                  <div className="w-10 rounded-full border border-gray-300">
                    {post?.userId?.profilePicture ? (
                      <img
                        src={post?.userId?.profilePicture}
                        alt={post?.userId?.username}
                      />
                    ) : (
                      <span className="text-3xl">
                        {post?.userId?.username?.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 items-center">
                  <Link
                    to={`/profile/${post?.userId?.username}`}
                    className="text-sm font-bold mb-0"
                  >
                    {post?.userId?.username}
                  </Link>
                  <p className="text-sm mb-0">
                    {post?.caption}{" "}
                    {post?.description ? `- ${post?.description}` : ""}
                  </p>
                  {post?.tags && (
                    <div className="flex flex-wrap items-center gap-2">
                      {post?.tags?.map((tag, index) => (
                        <Link
                          to={`/tag/${tag}`}
                          key={index}
                          className="text-fuchsia-900 text-sm font-bold"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    {formatTime(post?.createdAt)}
                  </p>
                </div>
              </div>
              {comments?.length === 0 && (
                <p className="text-center text-sm my-8">
                  No comments yet. Be the first to make a comment.
                </p>
              )}
              {comments?.map((comment) => (
                <div key={comment._id} className="my-4 px-1">
                  <div className="flex items-center gap-4">
                    <Link to={`/profile/${comment?.user?.username}`}>
                      <div className="avatar avatar-placeholder">
                        <div className="w-8 rounded-full border border-gray-300">
                          {comment?.user?.profilePicture ? (
                            <img
                              src={comment?.user?.profilePicture}
                              alt={comment?.user?.username}
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-xl">
                              {comment?.user?.username?.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="flex-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <Link className="text-sm font-semibold mb-0">
                            {comment?.user?.username}
                          </Link>
                          <p className="text-sm mb-0">{comment?.comment}</p>
                        </div>
                        <div className="flex gap-4">
                          <p className="text-xs text-gray-500">
                            {formatTime(comment?.createdAt)}
                          </p>
                          <p className="text-xs text-gray-500 font-semibold">
                            {comment?.likes?.length} likes
                          </p>
                          {comment?.user?._id === user?._id && (
                            <i
                              className="ri-delete-bin-7-line cursor-pointer text-gray-500"
                              role="button"
                              title="Delete comment"
                              onClick={() => {
                                deleteComment(comment._id, accessToken);
                                setData((prev) => {
                                  return {
                                    ...prev,
                                    comments: prev.comments.filter(
                                      (e) => e._id !== comment._id
                                    ),
                                  };
                                });
                              }}
                            ></i>
                          )}
                        </div>
                      </div>
                    </div>
                    <i
                      className={`${
                        comment?.likes?.includes(user?._id)
                          ? "ri-heart-fill text-red-700"
                          : "ri-heart-line"
                      } cursor-pointer`}
                      role="button"
                    ></i>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white relative z-30 w-full border-t border-gray-300 py-2">
              <div className="flex justify-between items-center px-4">
                <div className="flex gap-4 items-center">
                  <i
                    className={`${
                      post?.likes?.includes(user?._id)
                        ? "ri-heart-fill text-red-700"
                        : "ri-heart-line"
                    } cursor-pointer text-2xl`}
                    role="button"
                    title={post?.likes?.includes(user?._id) ? "Unlike" : "Like"}
                  ></i>
                  <label htmlFor="comment">
                    <i
                      className="ri-chat-3-line text-2xl cursor-pointer"
                      title="comment"
                    ></i>
                  </label>
                </div>
                <i
                  className={`${
                    post?.savedBy?.includes(user?._id)
                      ? "ri-bookmark-fill text-gray-800"
                      : "ri-bookmark-line"
                  } text-2xl cursor-pointer`}
                  role="button"
                  title={post?.savedBy?.includes(user?._id) ? "Unsave" : "Save"}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
