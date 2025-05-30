import { GothicButton } from "../gothic-button";

export function InventoryToggleButton({ children, onClick, isOpen }) {
  return (
    <div className="relative flex gap-x-4 justify-between items-center z-10">
      <GothicButton variant="amber" onClick={onClick} isOpen={isOpen}>
        {children}
      </GothicButton>
    </div>
  );
}
