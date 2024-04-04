"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Shirt, Shirts } from "./data/InMemory"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Home() {
  const [filter, setFilter] = useState<string>("");
  const [filteredShirts, setFilteredShirts] = useState<Shirt[] | null>([]);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    // filtrando por nome
    if (filter === "") {
      setFilteredShirts(Shirts)
    } else {
      setFilteredShirts(
        Shirts.filter((shirt) => shirt.name.toLowerCase().includes(filter.toLowerCase())) 
      )
    }

  }, [filter])

  useEffect(() => {
    // filtrando por cor
    if (color === "") {
      setFilteredShirts(Shirts)
    } else {
      setFilteredShirts(
        Shirts.filter((shirt) => shirt.colors.includes(color)) 
      )
    }

  }, [color])

  useEffect(() => {
    // filtrando por tamanho
    if (size === "") {
      setFilteredShirts(Shirts)
    } else {
      setFilteredShirts(
        Shirts.filter((shirt) => shirt.sizes.includes(size)) 
      )
    }

  }, [size])

  useEffect(() => {
    // filtrando por preço
    if (price === "") {
      setFilteredShirts(Shirts)
    } else {
      setFilteredShirts(
        Shirts.filter((shirt) => shirt.price <= Number(price)) 
      )
    }

  }, [price])

  const handleClearFilter = () => {
    setFilter("")
    setColor("")
    setSize("")
    setFilteredShirts(Shirts)
  }

  return (
    <div className="min-h-screen w-screen">
      <nav className="p-4">
        <Link href="/">A|Z</Link>
      </nav>
      <main className="flex flex-col items-center justify-between p-4">
        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-col xl:flex-row justify-between text-center">
            <h1 className="text-3xl font-bold">Nossas camisetas</h1>
            <div className="flex flex-col xl:flex-row gap-2 content-end mt-8 xl:mt-0">
              {/* potencial para virar componente, mas por tamanho do projeto é melhor evitar otimizacão prematura */}
              <Input type="text" placeholder="Pesquisar por nome" className="w-full xl:w-1/2" onChange={(e) => {
                setFilter(e.target.value)}} 
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>Filtrar por</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Cores</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={color} onValueChange={setColor}>
                          <DropdownMenuRadioItem value="red">
                            <span className="w-4 h-4 rounded-full bg-red-500"></span>
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="blue">
                            <span className="w-k h-4 rounded-full bg-blue-500"></span>
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="orange">
                            <span className="w-4 h-4 rounded-full bg-orange-500"></span>
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Tamanho</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={size} onValueChange={setSize}>
                          <DropdownMenuRadioItem value="P">P</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="M">M</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="G">G</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Preços</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={price} onValueChange={setPrice}>
                          <DropdownMenuRadioItem value="10">Até R$ 10.00</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="20">Até R$ 20.00</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="50">Até R$ 50.00</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="secondary" onClick={() => handleClearFilter()}>Limpar</Button>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row flex-wrap xl:flex-nowrap gap-4 w-1/2 mt-8 xl:mx-0">
            {
              filteredShirts?.map(({ id, name, price, sizes, colors }) => (
                <Card className="min-w-64">
                  <figure className="w-full h-48">
                    <Image src={`/shirt-${id}.jpg`} alt="camiseta variada" width={200} height={200} className="w-full h-full object-cover rounded" />
                  </figure>
                  <CardHeader>
                    <CardTitle className="text-xl mt-2">{name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 text-zinc-500 text-xl">
                    <p className="text-sm">Tamanhos: {sizes.join(", ")}</p>
                    <div className="text-sm flex items-center gap-2">
                      <p>Cores: </p>
                      {
                        colors.map((color) => (
                          <span key={color} className={`w-3 h-3 rounded-full bg-${color}-500`}></span>
                        ))
                      }
                    </div>
                    <p>R$ {price}</p>
                    <Button>
                      <Link key={id} href={`/camisetas/${id}`}>
                        Ver detalhes
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </main>
    </div>
  );
}
