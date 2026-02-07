import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Eye } from 'lucide-react';
import Badge from '../components/Badge';
import StarRating from '../components/StarRating';
import { categories, ages, potions, rarities } from '../data/mockListings';

const CreateListing = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    petName: '',
    category: 'Dragon',
    age: 'Newborn',
    potion: 'None',
    rarity: 'Normal',
    wantInReturn: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.petName.trim()) {
      newErrors.petName = 'Pet name is required';
    }
    
    if (!formData.wantInReturn.trim()) {
      newErrors.wantInReturn = 'Please specify what you want in return';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Listing created:', formData);
      navigate('/listings');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Listing</h1>
          <p className="text-gray-400">List your pet for trading</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pet Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pet Name *
                </label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-dark-900 border ${
                    errors.petName ? 'border-primary' : 'border-dark-700'
                  } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                  placeholder="e.g., Shadow Dragon"
                />
                {errors.petName && (
                  <p className="text-primary text-sm mt-1">{errors.petName}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Age
                </label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                >
                  {ages.map(age => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </div>

              {/* Potion */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Potion
                </label>
                <select
                  name="potion"
                  value={formData.potion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                >
                  {potions.map(potion => (
                    <option key={potion} value={potion}>{potion}</option>
                  ))}
                </select>
              </div>

              {/* Rarity */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rarity
                </label>
                <select
                  name="rarity"
                  value={formData.rarity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                >
                  {rarities.map(rarity => (
                    <option key={rarity} value={rarity}>{rarity}</option>
                  ))}
                </select>
              </div>

              {/* Want in Return */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Want in Return *
                </label>
                <input
                  type="text"
                  name="wantInReturn"
                  value={formData.wantInReturn}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-dark-900 border ${
                    errors.wantInReturn ? 'border-primary' : 'border-dark-700'
                  } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                  placeholder="e.g., NFR Frost Dragon or good offers"
                />
                {errors.wantInReturn && (
                  <p className="text-primary text-sm mt-1">{errors.wantInReturn}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Any additional details about your pet..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pet Image
                </label>
                <div className="border-2 border-dashed border-dark-700 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex-1 px-6 py-3 bg-dark-800 text-white rounded-lg hover:bg-dark-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Preview
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Create Listing
                </button>
              </div>
            </form>
          </div>

          {/* Preview */}
          <div className={`${showPreview ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
              <div className="card p-4">
                <div className="relative mb-4 aspect-square bg-gradient-to-br from-dark-800 to-dark-850 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2">
                        <span className="text-3xl">🐾</span>
                      </div>
                      <p className="text-xs text-gray-500">Pet Image</p>
                    </div>
                  </div>
                  {formData.rarity !== 'Normal' && (
                    <div className="absolute top-2 left-2">
                      <Badge type="rarity" value={formData.rarity} />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">
                    {formData.petName || 'Pet Name'}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge type="category" value={formData.category} />
                    <Badge type="age" value={formData.age} />
                    {formData.potion !== 'None' && (
                      <Badge type="potion" value={formData.potion} />
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Wants in Return
                    </p>
                    <p className="text-sm text-gray-300">
                      {formData.wantInReturn || 'Not specified'}
                    </p>
                  </div>

                  {formData.description && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Description
                      </p>
                      <p className="text-sm text-gray-300">{formData.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
