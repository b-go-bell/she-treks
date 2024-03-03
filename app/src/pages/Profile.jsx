import React, { useEffect, useState } from 'react';
import './../resources/styles/pages/Profile.css';
import { getUserById, getImage, setProfileImage, getPostsByUserId } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function Profile() {
    const userId = "Wv4ozXlaxEVRrgPYUvQ65YJAhyl1";

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
            setPosts(userPosts);
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
        <div>
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

            <h1>{user ? 
                `${user.firstName + " " + user.lastName}` 
                : 'Loading...'}
            </h1>
            <h3>
                <FontAwesomeIcon icon={faLocationDot} />
                {user ?
                `${user.location}` : 'Loading...'}
            </h3>
            <p>
                {user ? 
                `${user.bio}` 
                : 'Loading...'}
            </p>
            <br></br>
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
    );
    }

    export default Profile;