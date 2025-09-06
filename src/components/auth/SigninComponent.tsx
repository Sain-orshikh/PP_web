'use client'

import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Dialog } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

interface SignInDialogProps {
  open: boolean
  onClose: () => void
  onForgotPassword: () => void
  onSignUp: () => void
}

const SignInDialog: React.FC<SignInDialogProps> = ({ 
  open,
  onClose, 
  onForgotPassword, 
  onSignUp 
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    remember: false
  })
  const { login, isLoading, error } = useAuth();
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await login.mutateAsync({ email: formData.emailOrPhone, password: formData.password });
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      toast.success('Successfully signed in!');
      onClose();
    } catch (err) {
      const msg = (err as Error)?.message || 'Login failed';
      setFormError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const [horizontalPadding, setHorizontalPadding] = useState('64px')

  // Set responsive padding based on screen width
  useEffect(() => {
    const handleResize = () => {
      setHorizontalPadding(window.innerWidth < 640 ? '32px' : '64px')
    }
    
    // Set initial value
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            background: '#fff',
            borderRadius: '16px',
            paddingTop: '40px',
            paddingBottom: '40px',
            maxWidth: '448px',
            paddingLeft: horizontalPadding,
            paddingRight: horizontalPadding,
          }
        }}
      >
      {/* Title */}
      <h2 
        className="text-deepblue font-bold mb-8 text-center"
        style={{ fontSize: '28px' }}
      >
        Log In
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email/Username Input */}
        <div>
          <label 
            className="block text-deepblue mb-2"
            style={{ fontSize: '16px' }}
          >
            Email
          </label>
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-[12px] border border-gray-300 text-deepblue placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors"
              style={{
                background: '#f8fafc',
                fontSize: '14px'
              }}
              placeholder="Email"
              required
            />
        </div>

        {/* Password Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label 
              className="text-deepblue"
              style={{ fontSize: '16px' }}
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center gap-2 hover:opacity-80 transition-all duration-200 cursor-pointer"
              style={{ color: '#888' }}
            >
              {showPassword ? (
                <FaEyeSlash size={16} />
              ) : (
                <FaEye size={16} />
              )}
              <span style={{ fontSize: '16px' }}>
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </button>
          </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-[12px] border border-gray-300 text-deepblue placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors"
              style={{
                background: '#f8fafc',
                fontSize: '14px'
              }}
              placeholder="Password"
              required
            />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="underline hover:opacity-80 transition-all duration-200 cursor-pointer"
            style={{
              color: '#888',
              fontSize: '14px'
            }}
          >
            Forgot password
          </button>
        </div>

        {/* Error message */}
        {(formError || error) && (
          <div className="text-red-500 text-center text-sm">{formError || error?.message}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || submitting}
          className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
        >
          {submitting ? 'Please wait...' : 'Log In'}
        </button>

        {/* Sign Up Link */}
        <div className="text-center">
          <span 
            className="text-deepblue"
            style={{ fontSize: '14px' }}
          >
            New user?{' '}
          </span>
        <button
          type="button"
          onClick={onSignUp}
          className="underline hover:opacity-80 transition-colors duration-200 cursor-pointer"
          style={{
            fontSize: '14px'
          }}
        >
          Sign Up
        </button>
        </div>
      </form>
    </Dialog>
  )
}

export default SignInDialog