import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Base_url="http://localhost:5000"



const Maincomponent = () => {
  const [data, setdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${Base_url}/api/group/getallgroup`);
        const sorteddatas = res.data.group.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  
        console.log(res.data.group)
        setdata(sorteddatas);
        setFilteredData(sorteddatas);

      } catch (err) {
        console.error('Error fetching datas:', err);
        setError('Failed to load datas. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

  fetchdata()

  }, []);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    const filtered = data.filter((group) =>
      group.name.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
      groupe.topic.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(trimmedQuery.toLowerCase()) 
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <div>
        <p className="loading">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="TOTAL">
    
     
      <div className="input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your area or data name"
        />
        <button className="search" onClick={handleSearch}>
          Search
        </button>
      </div>
      <br />
      <br />
      <div className="containers">
        <div className="grid">
          {filteredData.length > 0 ? (
            filteredData.map((data) => (
              <div className="data-card" key={data._id}>
                {data.images && data.images.length > 0 ? (
                  <img
                    className="data-image"
                    onClick={() => navigate(`/detailsdata/${data._id}`)}
                    src={data.images[0]}
                    alt={`${data.name} first image`}
                  />
                ) : (
                  <p>No images available</p>
                )}
                <div className="data-details">
                  <p className="data-title">{data.name}</p>
                  <p className="data-title">{data.topic}</p>
                  <p className="data-title">{data.subject}</p>
                  <button
                    className="moremore"
                    onClick={() => navigate(`/detailsdata/${data._id}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No group found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Maincomponent;
