# 🖼️ AnimeGen

<p align="left">
  <img src="https://raw.githubusercontent.com/saliftankoano/AnimeGen/refs/heads/main/public/AG.png" alt="AnimeGen Logo" width="200" />
</p>

AnimeGen is a modern web application that empowers users to create, share, and discover AI-generated wallpapers and images. Built with Next.js, TypeScript, and Tailwind CSS, it offers a seamless and interactive experience for creative minds.

## ✨ Features

### 🎨 Image Generation

- Write prompts to generate unique AI images
- Character limit guidance for optimal prompt writing
- Real-time generation status updates
- Seamless integration with AI image generation API

### 👥 User Experience

- Clean and intuitive user interface
- Responsive design that works on all devices
- Dark/Light theme support
- Smooth animations and transitions using Framer Motion

### 🌟 Social Features

- User profiles with customizable bios
- Image likes and interaction tracking
- Real-time updates using Supabase
- Image sharing and downloading capabilities

### 🔐 Authentication

- Secure user authentication with Clerk
- Protected routes and API endpoints
- Profile management and customization

## 🛠️ Technical Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase
- **State Management**: React Hooks
- **Animations**: Framer Motion
- **Styling**: Shadcn UI Components
- **Deployment**: Vercel

## 🚀 Future Plans

1. **Enhanced Social Features**

   - Comments system (coming soon)
   - User following/followers (coming soon)
   - Social sharing integrations (coming soon)

2. **Advanced Image Generation**

   - AI-assisted prompt suggestions (coming soon)
   - Multiple style options (coming soon)
   - Batch generation capabilities (coming soon)

3. **Community Features**

   - User collections/galleries (coming soon)
   - Featured images section (coming soon)
   - Community challenges (coming soon)

4. **Premium Features**
   - Priority generation (coming soon)
   - Advanced customization options (coming soon)
   - Exclusive styles and filters (coming soon)

## 💡 Technical Challenges & Solutions

### Authentication and Security

- I stuggled initially with keeping unautharized users from accessing the create page
- Fixed by using server side validation prior to allowing users to access the create page

### Real-time Updates

- Implemented Supabase real-time subscriptions for instant like updates
- Optimized data synchronization to prevent unnecessary rerenders

### Image Generation

- Built a robust error handling system for generation failures
- Implemented loading states and progress indicators
- Difficulty in getting the image to downloaded image to show up in the correct format fixed by setting explicit headers in the fetch request and file type in the blob

### Performance

- Optimized image loading with Next.js Image component
- Implemented lazy loading for better initial page load
- Used efficient state management patterns

## 🤝 Contributing

We welcome contributions! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Internal Optimizations and Improvements

- Create a hook to handle image downloading
- Create a hook to handle image sharing
- Create a hook to handle image liking

## 🙏 Acknowledgments

- Built by Salif Tankoano
- Inspired by the creative AI community
- Special thanks to Headstarter for the inspiration

---

## My todo list

- [x] Fix overprotection of create page
- [x] Fix dark mode theme switcher color to be consistent with other hover effects
- [x] Add Shimmer effect for loading state
- [ ] Fix loading state to be more consistent
- [ ] Migrate to supabase auth
- [ ] Implement generation rating connection to the database
- [ ] Add LLM prompt augmentation

<p align="center">Made with ❤️ by the AnimeGen team</p>
