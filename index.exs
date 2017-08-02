defmodule GameBoyRomVisualizer do
    def read_header do
        {:ok, file} = File.open("./roms/PokemonRed.gb", [:read]);
        <<
            _ :: binary-size(308), 
            name :: binary-size(11),
            manufacturer_code :: binary-size(4),
            cgb_flag :: binary-size(1),
            new_license_code :: binary-size(2),
            sgb_flag :: binary-size(1),
            cartridge_type :: binary-size(1),
            rom_size :: binary-size(1),
            ram_size :: binary-size(1),
            _ :: binary
        >> = IO.binread(file, :all) 
        name |> print_result("ROM name")
        manufacturer_code |> Base.encode16 |> print_result("Manufacturer Code")
        cgb_flag |> Base.encode16 |> print_result("CGB Flag")
        new_license_code |> Base.encode16 |> print_result("New License Code")
        sgb_flag |> Base.encode16 |> print_result("SGB Flag")
        cartridge_type |> Base.encode16 |> print_result("Cartridge Type")
        rom_size |> Base.encode16 |> print_result("ROM size")
        ram_size |> Base.encode16 |> print_result("RAM size")
        File.close(file)
    end

    defp print_result(result, text) do
        IO.puts "#{text}: #{result}"
    end
end

GameBoyRomVisualizer.read_header