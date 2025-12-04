import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-700 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-96 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-white text-2xl">
              Create Account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              placeholder="Full Name"
              type="text"
              className="bg-white/20 border-white/30 text-white placeholder-white/60"
            />
            <Input
              placeholder="Email"
              type="email"
              className="bg-white/20 border-white/30 text-white placeholder-white/60"
            />
            <Input
              placeholder="Password"
              type="password"
              className="bg-white/20 border-white/30 text-white placeholder-white/60"
            />

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>

            <p className="text-center text-white/70 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
