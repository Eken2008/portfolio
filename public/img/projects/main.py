import os
import subprocess

def convert_png_to_avif_and_compare_size(input_png_path, output_avif_path):
    """
    Converts a PNG image to AVIF and shows the difference in file size.

    Args:
        input_png_path (str): Path to the input PNG image.
        output_avif_path (str): Path for the output AVIF image.
    """

    if not os.path.exists(input_png_path):
        print(f"Error: Input PNG file not found at '{input_png_path}'")
        return

    try:
        # Get original PNG file size
        png_size_bytes = os.path.getsize(input_png_path)
        png_size_kb = png_size_bytes / 1024

        print(f"Original PNG file: {input_png_path}")
        print(f"PNG file size: {png_size_kb:.2f} KB")

        # Convert PNG to AVIF using cavif (external tool)
        # We use Pillow to open and potentially convert to a temporary format
        # if cavif doesn't directly support PNG as input.
        # However, cavif usually takes image files directly.

        # Let's try converting directly using cavif first
        try:
            # -o for output, --quality for compression (0-100, 100 is best)
            # You can adjust --quality as needed.
            subprocess.run(
                ["avifenc", "--min", "30", "--max", "63", "-a", "end-usage=q", "-a", "cq-level=18", "-a", "tune=ssim", input_png_path, output_avif_path],
                check=True,
                capture_output=True,
                text=True
            )
            print(f"Successfully converted '{input_png_path}' to '{output_avif_path}' using cavif.")

        except subprocess.CalledProcessError as e:
            print(f"Error during AVIF conversion with cavif: {e}")
            print(f"STDOUT: {e.stdout}")
            print(f"STDERR: {e.stderr}")
            return

        # Get AVIF file size
        if os.path.exists(output_avif_path):
            avif_size_bytes = os.path.getsize(output_avif_path)
            avif_size_kb = avif_size_bytes / 1024

            print(f"Generated AVIF file: {output_avif_path}")
            print(f"AVIF file size: {avif_size_kb:.2f} KB")

            # Calculate and display difference
            difference_kb = png_size_kb - avif_size_kb
            percentage_reduction = (difference_kb / png_size_kb) * 100 if png_size_kb > 0 else 0

            print(f"\nSize Difference: {difference_kb:.2f} KB")
            print(f"Percentage Reduction: {percentage_reduction:.2f}%")
        else:
            print(f"Error: AVIF output file '{output_avif_path}' was not created.")

    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    for file in os.listdir():
        if not file.endswith(".png"): continue
        input_file = file
        output_file = file.replace(".png",".avif")

        convert_png_to_avif_and_compare_size(input_file, output_file)

        os.remove(file)