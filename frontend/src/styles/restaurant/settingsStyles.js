import { StyleSheet } from 'react-native';

const ORANGE = '#FF6A3D';
const GREEN = '#16c60c';

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
      header: {
        backgroundColor: '#fff',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
        marginBottom: 16,
      }, 
      headerTitle: {
        fontSize: 26,
        fontWeight: '700',
      },
      headerSub: {
        color: '#777',
        fontSize: 14,
      },
  
      card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
      },
  
      cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
      },
  
      acceptBtn: {
        borderRadius: 10,
        padding: 14,
        marginBottom: 14,
      },
      acceptInner: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      whiteDot: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#fff',
        marginRight: 10,
      },
      acceptText: { color: '#fff', fontWeight: '600' },
  
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12,
      },
  
      label: { fontSize: 15, fontWeight: '500' },
      subLabel: { color: '#777', fontSize: 13 },
      sectionLabel: { fontWeight: '600', marginTop: 10 },
  
      busyContainer: {
        marginTop: 10,
        marginBottom: 10,
      },
  
      busyTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
  
      busyTitle: {
        fontSize: 16,
        fontWeight: '600',
      },
  
      busyBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
      },
  
      prepText: {
        fontSize: 13,
        color: '#777',
      },
  
      adjustRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',     // 🔑 stops full row underline
        borderBottomWidth: 1,        // underline
        borderBottomColor: '#777',
        paddingBottom: 2,
      },
  
      adjustText: {
        fontSize: 13,
        color: '#777',
        marginRight: 4,
      },
  
      operatingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
      },
  
      sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
      },
  
      timeText: {
        fontSize: 15,
        color: '#555',
      },
  
      editScheduleBtn: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#eee',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 10,
      },
  
      editScheduleText: {
        marginRight: 6,
        fontSize: 14,
        color: '#333',
      },
  
  
      editInline: {
        fontSize: 12,
        color: '#777',
        marginTop: 4,
      },
  
      scheduleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      },
      timeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ddd',
      },
      smallTimeInput: {
        padding: 10,
        width: 45,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
      },
      timeSeparator: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
      },
  
      timeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 5,
      },
      periodText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#555',
      },
      whiteText: {
        color: '#fff',
      },
      modalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
      },
  
      timeText: {
        color: '#555',
        fontWeight: '500',
      },
  
      subLabel: { 
        color: '#777', // Grey color for hierarchy
        fontSize: 16, 
        marginTop: 2,  // Label se thodi doori
        fontWeight: '500',
      },
      dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        minWidth: 120, // Taaki UI balanced lage
        justifyContent: 'space-between'
      },
  
      autoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Switch ko end mein push karne ke liye
        paddingVertical: 20, // Thoda extra space
      },
  
      setupBtn: {
        backgroundColor: '#5A7BFF',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 10,
      },
  
      menuRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
  
      menuListItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
      },
      menuListItemExtended: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
      },
      itemNameText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333'
      },
      itemDescText: {
        fontSize: 12,
        color: '#777',
        marginTop: 2,
        lineHeight: 16
      },
      statusBadgeNew: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20, // Full rounded pill shape
        borderWidth: 1,   // Light border for premium look
        alignSelf: 'flex-start',
      },
      statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 5,
      },
      statusTextNew: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase', // Professional look ke liye caps
        letterSpacing: 0.5,
      },  
      actionRow: {
        flexDirection: 'row', 
        marginTop: 15, 
        width: '100%', 
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
        paddingTop: 10
      },
      addBtnInside: {
        backgroundColor: GREEN, 
        padding: 12, 
        borderRadius: 10, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 15
      },
  
      actionIconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        flex: 0.3, // Teeno buttons barabar space lein
        justifyContent: 'center'
      },
      actionIconText: {
        fontSize: 12,
        marginLeft: 4,
        fontWeight: '600',
        color: '#555'
      },
      link: {
        fontSize: 15,
        marginTop: 10,
      },
  
      detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      detailLabel: {
        fontSize: 13,
        color: '#777',
        fontWeight: '500',
      },
      detailValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
      },
  
      modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
      },
  
      modalCard: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 16,
        padding: 20,
      },
  
      modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
      },
  
      timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      },
  
      timeInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        width: '100%',
        fontSize: 16,
      },
  
      periodRow: {
        flexDirection: 'row',
      },
  
      periodBtn: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginLeft: 8,
      },
  
      periodActive: {
        backgroundColor: ORANGE,
        borderColor: ORANGE,
      },
  
      counterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
      },
  
      counterBtn: {
        backgroundColor: '#eee',
        padding: 14,
        borderRadius: 10,
      },
  
      counterValue: {
        fontSize: 20,
        fontWeight: '600',
      },
  
      saveBtn: {
        backgroundColor: ORANGE,
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
      },
  
      timePicker: {
        padding: 14,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 12,
      },
  
      logoutBtn: {
        backgroundColor: ORANGE,
        height: 56,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 20,
      },
  
      logoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
      },
  
      profileSummaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fdfdfd',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        marginTop: 10,
      },
      avatarMini: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#FFF5F2',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFE0D8',
      },
  
      staffItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#EEE',
      },
      rolePickerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      rolePickerContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
      },
      roleOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      },
      roleText: {
        fontSize: 16,
        color: '#333',
      },
});

export default styles;