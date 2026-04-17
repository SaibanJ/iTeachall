import Link from 'next/link';
import NavItems from '@/components/NavItems';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => (
  <nav className="navbar">
    <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
      <div className="nav-logo-mark group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-shadow duration-300">
        iT
      </div>
      <span
        className="font-bold text-sm tracking-tight hidden sm:block"
        style={{ color: 'rgba(255,255,255,0.9)' }}
      >
        iTeach
      </span>
    </Link>

    <div className="flex items-center gap-2">
      <NavItems />
      <div className="w-px h-4 mx-2" style={{ background: 'rgba(255,255,255,0.1)' }} />
      <SignedOut>
        <SignInButton>
          <button className="btn-signin">Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </nav>
);

export default Navbar;
