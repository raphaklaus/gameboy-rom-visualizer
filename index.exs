defmodule GameBoyRomVisualizer do
    def read_header do
        {:ok, file} = File.open("./roms/PokemonRed.gb", [:read]);
        <<_ :: binary-size(308), name :: binary-size(16), _ :: binary>> = IO.binread(file, :all) 
        name |> IO.puts
        File.close(file)
    end
end

GameBoyRomVisualizer.read_header