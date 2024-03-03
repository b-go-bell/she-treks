import React, { useEffect, useState } from 'react';
import './../resources/styles/pages/App.css';
import './../resources/styles/pages/Profile.css';
import { getProfileImage, getUserById, setProfileImage } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [user, setUser] = useState();
    const [profileImageUrl, setProfileImageUrl] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            // get user data from Firebase and Storage
            const userData = await getUserById("Wv4ozXlaxEVRrgPYUvQ65YJAhyl1");
            const userProfileImage = await getProfileImage("Wv4ozXlaxEVRrgPYUvQ65YJAhyl1");

            setUser(userData);
            setProfileImageUrl(userProfileImage);

          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };
    
        fetchUserData();
      }, []);

      const handleImageClick = () => {
        document.getElementById('fileInput').click();
      };
    
      const handleFileChange = async (e) => {
        const file = e.target.files[0];
    
        if (file) {
          try {
            // Upload the profile image and get the download URL to update the image on the page
            await setProfileImage("Wv4ozXlaxEVRrgPYUvQ65YJAhyl1", file);
            const downloadUrl = await getProfileImage("Wv4ozXlaxEVRrgPYUvQ65YJAhyl1");
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
        </div>
    );
    }

    export default App;