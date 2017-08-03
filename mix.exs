defmodule GameBoyRomVisualizer.Mixfile do
  use Mix.Project

  def project do
    [
      app: :GameBoyRomVisualizer,
      version: "0.0.1",
      deps: deps()
    ]
  end
  defp deps do
  [
      {:credo, "~> 0.8", only: [:dev, :test], runtime: false}
  ]
  end
    
end
