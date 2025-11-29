import { useState } from 'react';
import { Input } from './Input';
import { Select } from './Select';
import { Button } from './Button';
import { Logo } from './Logo';

interface SignupPageProps {
  onSwitchToLogin: () => void;
}

export function SignupPage({ onSwitchToLogin }: SignupPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [vedamId, setVedamId] = useState('');
  const [password, setPassword] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [campus, setCampus] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [studentMail, setStudentMail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!fullName || !email || !vedamId || !password || !year) {
      setError('Please fill in all required fields');
      return;
    }

    if (year === '1') {
      if (!branch || !campus || !state || !city) {
        setError('Please fill in all first-year required fields');
        return;
      }
    } else {
      if (!studentMail) {
        setError('Please provide your student email');
        return;
      }
    }

    // TODO: Integrate with Supabase
    console.log('Signup attempt:', {
      fullName,
      email,
      vedamId,
      password,
      year,
      ...(year === '1'
        ? { branch, campus, state, city }
        : { studentMail }),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-green-200 to-pink-300">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex items-center gap-8">
              <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                Home
              </a>
              <a href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
                About Us
              </a>
              <a href="/community" className="text-gray-700 hover:text-gray-900 transition-colors">
                Community
              </a>
              <a href="/pg-finder" className="text-gray-700 hover:text-gray-900 transition-colors">
                PG Finder
              </a>
              <a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
                Contact
              </a>
              <button
                onClick={onSwitchToLogin}
                className="bg-white text-pink-500 border-2 border-pink-500 px-6 py-2 rounded-full hover:bg-pink-50 transition-all duration-200 hover:scale-105"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                Join Campus Buddy
              </h1>
              <p className="text-gray-600">Your companion for college life starts here</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Vedam ID"
                  type="text"
                  placeholder="VED12345"
                  value={vedamId}
                  onChange={(e) => setVedamId(e.target.value)}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Select
                label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="">Select your year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </Select>

              {/* Conditional Fields for Year 1 */}
              {year === '1' && (
                <>
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-gray-700 mb-4">First Year Information</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                          label="Branch"
                          type="text"
                          placeholder="Computer Science"
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          required
                        />

                        <Select
                          label="Campus"
                          value={campus}
                          onChange={(e) => setCampus(e.target.value)}
                          required
                        >
                          <option value="">Select campus</option>
                          <option value="Pune">Pune</option>
                          <option value="Bangalore">Bangalore</option>
                          <option value="Delhi">Delhi</option>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Select
                          label="State"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          required
                        >
                          <option value="">Select state</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Delhi (NCT)">Delhi (NCT)</option>
                          <option value="Jammu & Kashmir">Jammu &amp; Kashmir</option>
                          <option value="Ladakh">Ladakh</option>
                        </Select>

                        <Input
                          label="City"
                          type="text"
                          placeholder="Your city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Conditional Field for Year != 1 */}
              {year && year !== '1' && (
                <div className="pt-4 border-t border-gray-200">
                  <Input
                    label="Student Email"
                    type="email"
                    placeholder="john.doe@student.university.edu"
                    value={studentMail}
                    onChange={(e) => setStudentMail(e.target.value)}
                    required
                  />
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-1 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the Terms of Service and Privacy Policy
                  </span>
                </label>
              </div>

              <Button type="submit" fullWidth>
                Create Account
              </Button>

              <div className="text-center">
                <span className="text-gray-600">Already have an account? </span>
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-pink-500 hover:text-pink-600"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
