const CharacterModel = () => {
  return (
    <div className="character-container" aria-hidden="true">
      <div className="character-model character-model-fallback">
        <div className="character-rim" />
        <div className="character-fallback-glow" />
      </div>
    </div>
  );
};

export default CharacterModel;
