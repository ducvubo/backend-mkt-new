module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('hoas', 'ghichuVi', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('hoas', 'ghichuEn', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('hoas', 'ghichuVi'),
      queryInterface.removeColumn('hoas', 'ghichuEn')
    ]);
  }
};
