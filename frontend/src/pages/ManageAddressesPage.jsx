import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './ManageAddressesPage.css';

const ManageAddressesPage = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(AuthContext);
    const [addresses, setAddresses] = useState(['', '', '', '', '']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAddresses = async () => {
            if (!user) return;
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('/api/users/profile', config);
                if (data.addresses && data.addresses.length > 0) {
                    const existingAddresses = data.addresses.slice(0, 5);
                    const newAddresses = [...existingAddresses, ...Array(5 - existingAddresses.length).fill('')];
                    setAddresses(newAddresses);
                }
                setLoading(false);
            } catch (err) {
                setError('Could not fetch addresses.');
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [user]);

    const handleAddressChange = (index, value) => {
        const newAddresses = [...addresses];
        newAddresses[index] = value;
        setAddresses(newAddresses);
    };

    const handleSave = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            // Filter out empty strings before saving
            const nonEmptyAddresses = addresses.filter(addr => addr.trim() !== '');
            const { data } = await axios.put('/api/users/profile', { addresses: nonEmptyAddresses }, config);
            updateUser(data);
            alert('Addresses saved successfully!');
            navigate('/account');
        } catch (err) {
            setError('Could not save addresses.');
        }
    };

    const handleDiscard = () => {
        // This could fetch the original addresses again or just reset to empty
        window.location.reload();
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className='manage-addresses-page'>
            <div className='manage-addresses-container'>
                <h2>Manage Addresses</h2>
                <p>Our recommendations are tailored to you based on your profile choices.</p>
                {error && <p className='error-message'>{error}</p>}
                <div className='address-form'>
                    {addresses.map((address, index) => (
                        <div className='address-input-group' key={index}>
                            <label htmlFor={`address-${index}`}>Address {index + 1}:</label>
                            <input
                                type='text'
                                id={`address-${index}`}
                                value={address}
                                onChange={(e) => handleAddressChange(index, e.target.value)}
                                placeholder='xyz'
                            />
                        </div>
                    ))}
                </div>
                <div className='action-buttons'>
                    <button onClick={handleDiscard} className='btn-discard'>DISCARD</button>
                    <button onClick={handleSave} className='btn-save'>SAVE</button>
                </div>
            </div>
        </div>
    );
};

export default ManageAddressesPage;
