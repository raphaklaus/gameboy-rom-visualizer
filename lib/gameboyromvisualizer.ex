defmodule GameBoyRomVisualizer do
  use Bitwise

  def start do 
    import PipeHere

    File.read!("./roms/PokemonRed.gb") 
    |> read_header() 
    |> parse_2bpp([]) 
    |> File.write!('result', _) 
    |> pipe_here
  end

  def read_header(<<
      _ :: binary-size(308), 
      name :: binary-size(11),
      manufacturer_code :: binary-size(4),
      cgb_flag :: binary-size(1),
      new_license_code :: binary-size(2),
      sgb_flag :: binary-size(1),
      cartridge_type :: binary-size(1),
      rom_size :: binary-size(1),
      ram_size :: binary-size(1),
      rest :: binary >>) do
    name |> print_result("ROM name")
    manufacturer_code |> Base.encode16 |> print_result("Manufacturer Code")
    cgb_flag |> Base.encode16 |> print_result("CGB Flag")
    new_license_code |> Base.encode16 |> print_result("New License Code")
    sgb_flag |> Base.encode16 |> print_result("SGB Flag")
    cartridge_type |> Base.encode16 |> print_result("Cartridge Type")
    rom_size |> Base.encode16 |> print_result("ROM size")
    ram_size |> Base.encode16 |> print_result("RAM size")

    rest
  end

  defp parse_2bpp(<<low_byte :: size(8), high_byte :: size(8), bytes :: binary>>, result) do
    parse_2bpp(bytes, [parse_byte(<<low_byte>>, <<high_byte>>) | result])
  end

  defp parse_2bpp(<<>>, result) do
    result |> Enum.reverse |> Enum.join(",")
  end

  defp parse_byte(<<low_byte :: size(8) >>, << high_byte :: size(8)>>, bit \\ 0, result \\ []) do
    << most_significant_bit :: size(1), _ :: size(7) >> = << high_byte <<< bit >>
    << least_significant_bit :: size(1), _ :: size(7) >> = << low_byte <<< bit >>
    if bit < 8 do
      parse_byte(<<low_byte <<< bit>>, <<high_byte <<< bit>>, bit + 1, [Bitwise.bor(most_significant_bit <<< 1, least_significant_bit) | result])
    else
      result |> Enum.reverse |> Enum.join(",")
    end
  end

  # todo: transform it in a macro, or overloaded function to get rid of the if
  # defp parse_byte(<< 0x00 :: size(8) >>, << 0x00 :: size(8) >>, 8, result) do
  #   result |> Enum.reverse |> |> Enum.join(",")
  # end

  defp print_result(result, text) do
    IO.puts "#{text}: #{result}"
  end
end

GameBoyRomVisualizer.start