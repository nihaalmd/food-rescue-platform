import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/uploadDonation.css";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadDonation() {
  const [formData, setFormData] = useState({
  foodName: "",
  quantity: "",
  foodType: "",
  expiryTime: "",
  placeName: "",
  pickupAddress: "",
  latitude: "",
  longitude: "",
  description: "",
});

  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const autocompleteRef = useRef(null);

const onLoad = (autocomplete) => {
  autocompleteRef.current = autocomplete;
};

const onPlaceChanged = () => {
  const place = autocompleteRef.current.getPlace();

  console.log(place);
  console.log("NAME:", place.name);
  console.log("ADDRESS:", place.formatted_address);

  if (!place.geometry || !place.geometry.location) {
    return;
  }

  setFormData((prev) => ({
    ...prev,
    placeName: place.name,
    pickupAddress: place.formatted_address,
    latitude: place.geometry.location.lat(),
    longitude: place.geometry.location.lng(),
  }));
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.foodName.trim()) newErrors.foodName = "Food name is required";
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Valid quantity is required";
    if (!formData.foodType) newErrors.foodType = "Food type is required";
    if (!formData.expiryTime) newErrors.expiryTime = "Expiry time is required";
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = "Pickup address is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (images.length === 0) newErrors.images = "At least one food image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (files) => {
    const newImages = Array.from(files).filter((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Please select only image files");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return false;
      }
      return true;
    });

    if (images.length + newImages.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    const imageObjects = newImages.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...imageObjects]);
    if (errors.images) {
      setErrors((prev) => ({
        ...prev,
        images: "",
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleInputFileSelect = (e) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      URL.revokeObjectURL(prev[index].preview);
      return newImages;
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {

  const form = new FormData();

  form.append("foodName", formData.foodName);
  form.append("quantity", formData.quantity);
  form.append("foodType", formData.foodType);
  form.append("expiryTime", formData.expiryTime);
  form.append("placeName", formData.placeName);
  form.append("pickupAddress", formData.pickupAddress);
  form.append("latitude", formData.latitude);
  form.append("longitude", formData.longitude);
  form.append("description", formData.description);
  form.append("image", images[0].file);

  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/api/donations/create",
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  toast.success("Donation uploaded successfully! 🎉", {
    position: "top-right",
    autoClose: 3000,
  });

  setTimeout(() => {
  navigate("/restaurant/dashboard");
}, 1500);

  // Clear form fields
  setFormData({
    foodName: "",
    quantity: "",
    foodType: "",
    expiryTime: "",
    placeName: "",
    pickupAddress: "",
    latitude: "",
    longitude: "",
    description: "",
  });

  // Cleanup image preview URLs
  images.forEach((img) => {
    URL.revokeObjectURL(img.preview);
  });

  // Clear uploaded images
  setImages([]);

  // Clear validation errors
  setErrors({});

} catch (error) {

  console.log(error);

  alert(
    error.response?.data?.message ||
    "Upload failed"
  );

}
};

  const handleSaveDraft = () => {
    const draft = {
      formData,
      imageCount: images.length,
    };
    localStorage.setItem("foodDonationDraft", JSON.stringify(draft));
    alert("Draft saved successfully!");
  };

  return (
    <div className="upload-page">
      <Navbar />

      <div className="upload-container">
        <div className="upload-header">
          <div>
            <h1>Upload Food Donation</h1>
            <p>Share surplus food with nearby NGOs in real time.</p>
          </div>
          <button type="button" className="draft-btn" onClick={handleSaveDraft}>
            Save Draft
          </button>
        </div>

        <form className="donation-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>
                Food Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={handleInputChange}
                placeholder="e.g., Biryani, Pizza, Samosas"
                className={errors.foodName ? "error" : ""}
              />
              {errors.foodName && <span className="error-text">{errors.foodName}</span>}
            </div>

            <div className="form-group">
              <label>
                Quantity <span className="required">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Number of meals/portions"
                min="1"
                className={errors.quantity ? "error" : ""}
              />
              {errors.quantity && <span className="error-text">{errors.quantity}</span>}
            </div>

            <div className="form-group">
              <label>
                Food Type <span className="required">*</span>
              </label>
              <select
                name="foodType"
                value={formData.foodType}
                onChange={handleInputChange}
                className={errors.foodType ? "error" : ""}
              >
                <option value="">Select type</option>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="mixed">Mixed</option>
                <option value="packaged">Packaged</option>
              </select>
              {errors.foodType && <span className="error-text">{errors.foodType}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Expiry Time <span className="required">*</span>
              </label>
              <input
                type="datetime-local"
                name="expiryTime"
                value={formData.expiryTime}
                onChange={handleInputChange}
                className={errors.expiryTime ? "error" : ""}
              />
              {errors.expiryTime && <span className="error-text">{errors.expiryTime}</span>}
            </div>

            <div className="form-group">
              <label>
                Pickup Address <span className="required">*</span>
              </label>
              <LoadScript
  googleMapsApiKey={
    import.meta.env
      .VITE_GOOGLE_MAPS_API_KEY
  }
  libraries={["places"]}
>

  <Autocomplete
    onLoad={onLoad}
    onPlaceChanged={
      onPlaceChanged
    }
  >

    <input
      type="text"
      name="pickupAddress"
      value={
        formData.pickupAddress
      }
      onChange={
        handleInputChange
      }
      placeholder="Search exact restaurant location..."
      className={
        errors.pickupAddress
          ? "error"
          : ""
      }
    />

  </Autocomplete>
</LoadScript>
              {errors.pickupAddress && <span className="error-text">{errors.pickupAddress}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <label>
              Description <span className="required">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe the food condition, ingredients, storage method, etc."
              className={errors.description ? "error" : ""}
            ></textarea>
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-group full-width">
            <label>
              Upload Food Images <span className="required">*</span>
              <span className="image-count">({images.length}/5)</span>
            </label>

            <div
              className={`upload-zone ${dragActive ? "active" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="upload-icon">📸</div>
              <p className="upload-text">Drag and drop your images here</p>
              <p className="upload-subtext">or</p>
              <label className="upload-button">
                Click to browse
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleInputFileSelect}
                  style={{ display: "none" }}
                />
              </label>
              <p className="upload-info">Supported formats: JPG, PNG, WEBP (Max 5MB per image)</p>
            </div>
            {errors.images && <span className="error-text">{errors.images}</span>}

            {images.length > 0 && (
              <div className="image-preview-container">
                <h4>Preview ({images.length} image{images.length !== 1 ? "s" : ""})</h4>
                <div className="image-gallery">
                  {images.map((img, index) => (
                    <div key={index} className="image-preview">
                      <img src={img.preview} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeImage(index)}
                        title="Remove image"
                      >
                        ✕
                      </button>
                      <span className="image-number">{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Upload Donation
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={30000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default UploadDonation;