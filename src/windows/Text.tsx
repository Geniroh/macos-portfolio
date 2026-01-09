import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data.name}</h2>
      </div>

      <div className="text-file-content p-4">
        {data.image && (
          <img src={data.image} alt={data.name} className="text-file-image" />
        )}

        {data.subtitle && (
          <h3 className="text-file-subtitle">{data.subtitle}</h3>
        )}

        {data.description && data.description.length > 0 && (
          <div className="text-file-description">
            {data.description.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
