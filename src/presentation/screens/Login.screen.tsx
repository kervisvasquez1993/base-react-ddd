import { useState } from "react";
import { useAuthStore } from "../store/useAuthStatus.store";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

export const LoginScreen = () => {
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    console.log("Login");
    if (form.email === "" || form.password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const sendForm = await login(form.email, form.password);
      if (sendForm) {
        toast.success("Login success");
        return;
      }
    } catch (error) {
      toast.error("ERROR: Los datos suministrados no son correctos");
      throw new Error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="flex flex-col items-center">

            <h2 className="mx-4 w-full  flex flex-col items-center"><span className="self-center text-6xl font-semibold whitespace-nowrap">
              Login
            </span></h2>

          </CardHeader>
          <CardContent>
            <form onSubmit={onLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {loading ? "Cargando" : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
