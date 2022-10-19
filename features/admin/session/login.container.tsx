import Image from "next/image";
import useAuth from "./useAuth.hook";

export default function LoginContainer() {
  const { handleGoogleSignIn, unauthorized } = useAuth();
  return (
    <div className="flex flex-col md:mx-auto md:w-1/3 bg-white p-8 gap-6 rounded-lg">
      <Image
        src="/static/logo.png"
        width={160}
        height={64}
        objectFit="contain"
        alt="Parafait"
      />
      <span className="flex flex-col gap-2 items-center">
        <h3 className="font-bold text-xl text-center">
          Panel d'Administration
        </h3>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex justify-center w-3/4 gap-4 p-2 bg-primary-400 text-white rounded-lg"
        >
          <i className="bi bi-google"></i>
          <span>Google</span>
        </button>
      </span>
    </div>
  );
}
