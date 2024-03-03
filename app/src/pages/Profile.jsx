import React, { useEffect, useState } from 'react';
import './../resources/styles/pages/Profile.css';
import { getUserById, getImage, setProfileImage, getPostsByUserId } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import NavBar from './../components/NavBar';

function Profile() {
    const userId = "uFHGRa7deaMg9Azg9Aq5QKujMEJ2";

    const [user, setUser] = useState();
    const [profileImageUrl, setProfileImageUrl] = useState();
    const [posts, setPosts] = useState([]);
    const [postImageUrls, setPostImageUrls] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
            // get user data from Firebase and Storage
            const userData = await getUserById(userId);
            const userProfileImage = await getImage("profile", userId);
            const userPosts = await getPostsByUserId(userId);
            const imageUrls = await fetchPostImageUrls(userPosts);

            setUser(userData);
            setProfileImageUrl(userProfileImage);

            setPostImageUrls(imageUrls);

            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData();
    }, [posts]);

    // given array of posts, fetches the first image in each post's images array to display thumbnail
    const fetchPostImageUrls = async (postsArray) => {
        const urls = [];
        for (const post of postsArray) {
          if (Array.isArray(post.images) && post.images.length > 0) {
            try {
                const imageUrl = await getImage("post", post.images[0]);
                urls.push(imageUrl);
            } catch (error) {
                console.error('Error fetching image:', error.message);
                urls.push(null);
            }
          } else {
                urls.push(null);
          }
        }
        return urls;
      };

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };

    // called when the user uploads a new profile picture
    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
        try {
            // Upload the profile image and get the download URL to update the image on the page
            await setProfileImage(userId, file);
            const downloadUrl = await getImage("profile", userId);
            setProfileImageUrl(downloadUrl);

        } catch (error) {
            console.error('Error uploading profile image in Profile:', error.message);
        }
        }
    };

    return (
        <div className="profile">
            <NavBar />
            <div className="profile-container">
                <div className="profile-info">
                    <div className="sub-profile-info">
                        <div className="circular-image-container" onClick={handleImageClick}>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <img
                            className="circular-image"
                            src={profileImageUrl || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'}
                            alt="User Profile"
                        />
                        </div>
                        <div className="main-user-info">
                            <div className="username">
                                {user ? `${user.firstName + " " + user.lastName}` : 'Loading...'}
                            </div>
                            <div className="profile-other">
                                {user ? `${user.location}` : 'Loading...'}
                            </div>
                            <div className="profile-bio">
                                {user ? `${user.bio}` : 'Loading...'}
                            </div>
                        </div>
                    </div>

                </div>

                <div className='posts'>
                    <h2>Posts</h2>
                    {postImageUrls.length > 0 ? (
                        <div className="post-images-container">
                        {postImageUrls.map((imageUrl, index) => (
                            <div key={index} className="post-images-wrapper">
                            {imageUrl && (
                                <img
                                className="post-image"
                                src={imageUrl} // Displaying the corresponding image URL
                                alt={`Post ${index + 1}`}
                                />
                            )}
                            </div>
                        ))}
                        </div>
                    ) : (
                        <p>No posts yet!</p>
                    )}
                </div>
            </div>
        </div>
    );
    }

    export default Profile;