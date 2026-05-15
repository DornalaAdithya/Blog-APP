import React from "react";

function Footer() {
  return (
    <div>
      <footer class="bg-black text-gray-400 py-6">
        <div class="max-w-6xl mx-auto px-2 text-center">
          <h2 class="text-2xl font-bold text-white mb-1">MyBlog</h2>

          <p class="text-sm mb-3">Sharing ideas, stories, and knowledge with the world.</p>

          <div class="flex justify-center space-x-4 mb-4">
            <a href="#" class="hover:text-white transition">
              Twitter
            </a>
            <a href="#" class="hover:text-white transition">
              Instagram
            </a>
            <a href="#" class="hover:text-white transition">
              LinkedIn
            </a>
          </div>

          <p class="text-xs text-gray-500">© 2026 MyBlog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
