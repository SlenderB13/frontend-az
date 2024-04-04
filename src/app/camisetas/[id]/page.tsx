import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Shirts } from "../../data/InMemory"

export default function ShirtDetails({ params }: { params: { id: number } }) {
  const shirt = Shirts.find((shirt) => shirt.id == params.id)

  return (
    <div className="min-h-screen">
      <nav className="p-4">
        <Link href="/">A|Z</Link>
      </nav>
      <div className="flex flex-col md:flex-row p-4 justify-center">
        <Image src={`/shirt-${shirt?.id}.jpg`} alt="Modelo com camiseta" width={500} height={800} />
        <div className="flex flex-col gap-3 p-4">
          <h1 className="text-3xl font-bold">{shirt?.name}</h1>
              <div className="flex items-center gap-1">
                <p className="text-sm">Tamanhos: </p>
                <div className="flex gap-2 text-sm">
                  <RadioGroup className="flex">
                    {
                      shirt?.sizes.map((size) => (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={size} id={size} />
                          <Label htmlFor={size}>{size}</Label>
                        </div>
                      ))
                    }
                  </RadioGroup>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <p className="text-sm">Cores: </p>
                <div className="flex gap-2 text-sm">
                  <RadioGroup className="flex">
                    {
                      shirt?.colors.map((color) => (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={color} id={color} className={`w-5 h-5 bg-${color}-500`} />
                        </div>
                      ))
                    }
                  </RadioGroup>
                </div>
              </div>

              <p className="text-3xl mt-4">R$ {shirt?.price}</p>
          <div className="flex gap-4 w-1/2 mt-8">
            <Button>Colocar na sacola</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
