import Logo from "@/components/Logo";
import Link from "next/link";
import main from "../../public/assets/images/main.svg";
import styles from "../styles/page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <nav className={styles.nav_bar}>
        <Logo />
      </nav>
      <div className={`container ${styles.page}`}>
        <div className={styles.info}>
          <h1 className={styles.title}>
            job <span>tracking</span> app
          </h1>
          <p className={styles.subtitle}>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link href="/dashboard" className={`btn btn-hero`}>
            Login/Register
          </Link>
        </div>
        <Image
          src={main}
          alt="job hunt"
          className={`${styles.main_img} img`}
          width={300}
          height={500}
        />
      </div>
    </main>
  );
}
